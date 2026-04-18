import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { navigateTo } from "./navigation.js";

/**
 * Determines where to navigate after the splash screen ends
 */
export function checkInitialAuthFlow() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Stop listening after the first result
        if (user) {
            // User is logged in, skip auth page
            console.log("Persistence: User detected, navigating to Home.");
            navigateTo('home');
        } else {
            // No user, show auth page
            console.log("No user session, showing Auth Page.");
            navigateTo('auth');
        }
    });
}
