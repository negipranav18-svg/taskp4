import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBxKwCmAIAhRXxAb2bsY2zWE1je9VqbIRo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "task4-d928a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "task4-d928a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "task4-d928a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "167723669866",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:167723669866:web:75561b705d77d240462d13",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TDVL9EQH3W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
