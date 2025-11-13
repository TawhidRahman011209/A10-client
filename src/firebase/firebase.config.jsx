// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeOvXWXrUjEYZ-kT8wF_xkt1MstlGXrRo",
  authDomain: "my-tenth-assignment-66d92.firebaseapp.com",
  projectId: "my-tenth-assignment-66d92",
  storageBucket: "my-tenth-assignment-66d92.firebasestorage.app",
  messagingSenderId: "853592049793",
  appId: "1:853592049793:web:da1fe65d3ee55083eb6580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();

export default app;
