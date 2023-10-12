// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfQASdEGvTNaPuPYSVO64llZDM_Y6f1rU",
  authDomain: "projet-musee-a4c19.firebaseapp.com",
  projectId: "projet-musee-a4c19",
  storageBucket: "projet-musee-a4c19.appspot.com",
  messagingSenderId: "175653849908",
  appId: "1:175653849908:web:bc6da749b9636716567361",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // établi la connexion avec la base de données
export default db;
