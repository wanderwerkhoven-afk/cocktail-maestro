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
    setDoc,
    onSnapshot,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";
export { auth, db };
import { refreshState, setCloudCocktails, setCloudMocktails, setCloudKitchen } from "./state.js";

/**
 * Fetch the global cocktail, mocktail and kitchen databases from Firestore
 */
export async function fetchGlobalDatabases() {
    try {
        console.log("Fetching global databases from cloud...");
        const [cocktailSnap, mocktailSnap, kitchenSnap] = await Promise.all([
            getDocs(collection(db, "Cocktail-db")),
            getDocs(collection(db, "Mocktail-db")),
            getDocs(collection(db, "Kitchen-db"))
        ]);

        const cocktails = cocktailSnap.docs.map(doc => doc.data());
        const mocktails = mocktailSnap.docs.map(doc => doc.data());
        const kitchen = kitchenSnap.docs.map(doc => doc.data());

        setCloudCocktails(cocktails);
        setCloudMocktails(mocktails);
        setCloudKitchen(kitchen);

        // Notify the rest of the app that data has changed
        window.dispatchEvent(new CustomEvent('cloudDataChanged'));

        console.log(`Loaded ${cocktails.length} cocktails, ${mocktails.length} mocktails, and ${kitchen.length} kitchen cards.`);
        return { cocktails, mocktails, kitchen };
    } catch (e) {
        console.error("Error fetching global databases:", e);
        return null;
    }
}

/**
 * Handle user registration
 */
export async function registerUser(email, password, displayName) {
    let user;
    try {
        // Step 1 (critical): Create the Firebase Auth account — user is auto-logged in here
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        
        // Step 2 (critical): Set the display name on the Auth profile
        await updateProfile(user, { displayName });
    } catch (error) {
        // Auth creation failed — return the real error
        console.error("Registration auth error:", error);
        return { success: false, error: error.message };
    }

    try {
        // Step 3 (non-critical): Save profile to Firestore
        // If this fails the user is still logged in — initAuthListener will retry on next load
        await syncLocalDataToCloud(user, true);
    } catch (firestoreError) {
        // Log but don't block — auth succeeded, so registration is effectively done
        console.warn("Firestore profile write failed after registration (will retry):", firestoreError);
    }

    return { success: true, user };
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
        
        // Failsafe: ensure displayName and email are always present in Firestore.
        // Uses merge so existing data (ingredients, favorites, etc.) is never overwritten.
        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName || '',
            email: user.email,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        
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
async function syncLocalDataToCloud(user, isNewUser = false) {
    const uid = user.uid;
    const data = {
        displayName: user.displayName,
        email: user.email,
        updatedAt: new Date().toISOString(),
        ingredients: JSON.parse(localStorage.getItem('myIngredients')) || {},
        favorites: JSON.parse(localStorage.getItem('myFavorites')) || [],
        recipes: JSON.parse(localStorage.getItem('myRecipes')) || [],
        shoppingList: JSON.parse(localStorage.getItem('shoppingList')) || []
    };
    
    // Save createdAt only once, on first registration
    if (isNewUser) {
        data.createdAt = new Date().toISOString();
    }
    
    await setDoc(doc(db, "users", uid), data, { merge: true });
}

/**
 * Fetch data from Firestore and update LocalStorage
 */
/**
 * Check if the current user is an admin
 */
export async function checkAdminStatus(uid) {
    if (!uid) return false;
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data().Admin === true;
        }
    } catch (e) {
        console.error("Error checking admin status:", e);
    }
    return false;
}

export async function fetchCloudData(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.ingredients) localStorage.setItem('myIngredients', JSON.stringify(data.ingredients));
        if (data.favorites) localStorage.setItem('myFavorites', JSON.stringify(data.favorites));
        if (data.recipes) localStorage.setItem('myRecipes', JSON.stringify(data.recipes));
        if (data.shoppingList) localStorage.setItem('shoppingList', JSON.stringify(data.shoppingList));
        
        // Refresh in-memory state
        refreshState();
        
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
        const payload = {
            displayName: user.displayName,
            email: user.email,
            updatedAt: new Date().toISOString()
        };
        payload[type] = data;
        await setDoc(doc(db, "users", user.uid), payload, { merge: true });
        console.log(`Synced ${type} to cloud.`);
    } catch (error) {
        console.error(`Error syncing ${type}:`, error);
    }
}

/**
 * Listener for auth changes and real-time data sync
 */
let dataUnsubscribe = null;

/**
 * Update user profile (displayName)
 */
export async function updateUserProfile(displayName) {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in" };
    try {
        await updateProfile(user, { displayName });
        // Also sync to firestore
        await syncLocalDataToCloud(user);
        return { success: true };
    } catch (error) {
        console.error("Update profile error:", error);
        return { success: false, error: error.message };
    }
}

export function initAuthListener(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (dataUnsubscribe) {
            dataUnsubscribe();
            dataUnsubscribe = null;
        }

        if (user) {
            // First do an initial fetch
            await fetchCloudData(user.uid);
            
            // Update user info in cloud (name, email)
            await syncLocalDataToCloud(user);

            // Then subscribe to real-time updates for multi-device sync
            dataUnsubscribe = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    let hasChanges = false;

                    const syncField = (field, storageKey) => {
                        const newVal = JSON.stringify(data[field]);
                        if (data[field] !== undefined && newVal !== localStorage.getItem(storageKey)) {
                            localStorage.setItem(storageKey, newVal);
                            hasChanges = true;
                        }
                    };

                    syncField('ingredients', 'myIngredients');
                    syncField('favorites', 'myFavorites');
                    syncField('recipes', 'myRecipes');
                    syncField('shoppingList', 'shoppingList');

                    if (hasChanges) {
                        console.log("Cloud data updated, refreshing state...");
                        refreshState();
                        
                        // Notify UI that data has changed (optional, but navigation already handles it)
                        // For real real-time, we could dispatch an event here
                        window.dispatchEvent(new CustomEvent('cloudDataChanged'));
                    }
                }
            });
        }

        if (callback) callback(user);
    });
}
