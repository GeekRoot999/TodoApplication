import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIFWLgjUuCEciyGk9kJ8RhsPACZTYUhiM",
  authDomain: "tapapplication-a0211.firebaseapp.com",
  projectId: "tapapplication-a0211",
  storageBucket: "tapapplication-a0211.appspot.com",
  messagingSenderId: "330133276625",
  appId: "1:330133276625:web:2643592eee10ec1ab782f0",
  measurementId: "G-YLZQ2ML7K3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };