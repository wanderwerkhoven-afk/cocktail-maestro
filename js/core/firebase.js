import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDmNAnEIGOsScRJiCQKSfY-DDHu5gKYb8",
  authDomain: "gipfel-lodge.firebaseapp.com",
  projectId: "gipfel-lodge",
  storageBucket: "gipfel-lodge.firebasestorage.app",
  messagingSenderId: "388067449391",
  appId: "1:388067449391:web:40edc9d37e6d0e88aa84da",
  measurementId: "G-VNMHM819N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
