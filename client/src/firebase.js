// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-394b4.firebaseapp.com",
  projectId: "mernauth-394b4",
  storageBucket: "mernauth-394b4.firebasestorage.app",
  messagingSenderId: "503600562959",
  appId: "1:503600562959:web:3ab0250c2173c6f0f4b47a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);