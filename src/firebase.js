
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBivTpt2dZio5kSV3Loq55zfFIPtT_hfzY",
  authDomain: "myfirebasey126-5fb2e.firebaseapp.com",
  projectId: "myfirebasey126-5fb2e",
  storageBucket: "myfirebasey126-5fb2e.firebasestorage.app",
  messagingSenderId: "301395788215",
  appId: "1:301395788215:web:145588449aa0255a2c2832",
  measurementId: "G-TDVL9EQH3W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
