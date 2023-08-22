import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNagoG44VbPcWc_8gVDQu2RQ07I-unK3g",
  authDomain: "fast-lanes-llc.firebaseapp.com",
  projectId: "fast-lanes-llc",
  storageBucket: "fast-lanes-llc.appspot.com",
  messagingSenderId: "1025758671398",
  appId: "1:1025758671398:web:66d8b18dc7038362006ce7",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
