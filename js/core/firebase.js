import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, browserLocalPersistence, setPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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
const auth = getAuth(app);

// Persist login across browser restarts and page reloads on every device
// browserLocalPersistence saves the token in localStorage (survives tab/browser close)
await setPersistence(auth, browserLocalPersistence);

export { auth };
export const db = getFirestore(app);
