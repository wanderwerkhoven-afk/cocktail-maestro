import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { 
    doc, 
    getDoc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

/**
 * Handle user registration
 */
export async function registerUser(email, password, displayName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update profile with name
        await updateProfile(user, { displayName });
        
        // Sync existing local data to new account
        await syncLocalDataToCloud(user.uid);
        
        return { success: true, user };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Handle user login
 */
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Fetch data from cloud
        await fetchCloudData(user.uid);
        
        return { success: true, user };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Handle logout
 */
export async function logoutUser() {
    try {
        await signOut(auth);
        // Clear local storage on logout if desired, or just session state
        // For now, we just sign out. UI will handle navigation.
        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        console.error("Reset error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Sync LocalStorage data to Firestore
 */
async function syncLocalDataToCloud(uid) {
    const data = {
        ingredients: JSON.parse(localStorage.getItem('myIngredients')) || {},
        favorites: JSON.parse(localStorage.getItem('myFavorites')) || [],
        recipes: JSON.parse(localStorage.getItem('myRecipes')) || []
    };
    
    await setDoc(doc(db, "users", uid), data, { merge: true });
}

/**
 * Fetch data from Firestore and update LocalStorage
 */
export async function fetchCloudData(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.ingredients) localStorage.setItem('myIngredients', JSON.stringify(data.ingredients));
        if (data.favorites) localStorage.setItem('myFavorites', JSON.stringify(data.favorites));
        if (data.recipes) localStorage.setItem('myRecipes', JSON.stringify(data.recipes));
        
        // Refresh the app UI (handled by caller or listener)
        return data;
    }
    return null;
}

/**
 * Sync a specific data type to Firestore if user is logged in
 */
export async function syncData(type, data) {
    const user = auth.currentUser;
    if (!user) return; // Only sync if logged in

    try {
        const payload = {};
        payload[type] = data;
        await setDoc(doc(db, "users", user.uid), payload, { merge: true });
        console.log(`Synced ${type} to cloud.`);
    } catch (error) {
        console.error(`Error syncing ${type}:`, error);
    }
}

/**
 * Listener for auth changes
 */
export function initAuthListener(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, sync data
            await fetchCloudData(user.uid);
        }
        if (callback) callback(user);
    });
}
