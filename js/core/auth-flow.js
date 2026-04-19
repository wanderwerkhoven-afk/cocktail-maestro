import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

/**
 * Determines where to navigate after the splash screen ends
 * Returns a promise that resolves to the destination pageId ('home' or 'auth')
 */
export async function getInitialDestination() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // Stop listening after the first result
            if (user) {
                console.log("Persistence: User detected.");
                resolve('home');
            } else {
                console.log("No user session.");
                resolve('auth');
            }
        });
    });
}
