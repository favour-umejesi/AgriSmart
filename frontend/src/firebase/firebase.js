// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI9crRcPARSfBI3dNcz_DIcxMhl3FJBng",
  authDomain: "agrismart-2d355.firebaseapp.com",
  projectId: "agrismart-2d355",
  storageBucket: "agrismart-2d355.firebasestorage.app",
  messagingSenderId: "700411057755",
  appId: "1:700411057755:web:b14ed7001af7ddec3c917e",
  measurementId: "G-12M1WQ23RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };