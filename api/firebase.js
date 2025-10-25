// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWwdUARQsBbwtaS4Gs3_-JgYjyAl_fqTM",
  authDomain: "appparqueos.firebaseapp.com",
  projectId: "appparqueos",
  storageBucket: "appparqueos.firebasestorage.app",
  messagingSenderId: "858661492639",
  appId: "1:858661492639:web:2777146f45e7ce7b720faa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar servicios
export const auth = getAuth(app);  // autenticar
export const db = getFirestore(app); // base de datos
export const storage = getStorage(app); // archivos
export { app };