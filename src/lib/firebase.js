// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwhtBpgkfQnHKotyyIALPC1OSQBDaSjhU",
  authDomain: "skillgapradar.firebaseapp.com",
  projectId: "skillgapradar",
  storageBucket: "skillgapradar.firebasestorage.app",
  messagingSenderId: "1074619557999",
  appId: "1:1074619557999:web:beb38ef5cd50207c77059a",
  measurementId: "G-1VX2BP8Y67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup, signOut, onAuthStateChanged };
