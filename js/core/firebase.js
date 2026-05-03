import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPEa6wKVE7JV-qitDNPJ2VMDQnO7TE7II",
  authDomain: "cocktail--meastro.firebaseapp.com",
  projectId: "cocktail--meastro",
  storageBucket: "cocktail--meastro.firebasestorage.app",
  messagingSenderId: "166831300373",
  appId: "1:166831300373:web:c7beecec0857c8f74fd31c",
  measurementId: "G-N766W2J7CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
// Note: Firebase Web SDK already uses browserLocalPersistence by default —
// sessions survive browser restarts without any extra configuration.
export const auth = getAuth(app);
export const db = getFirestore(app);
