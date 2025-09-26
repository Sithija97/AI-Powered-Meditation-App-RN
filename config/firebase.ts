// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAadjOHCtwWvCGqs_zcAh0l18wBqvni_Pc",
  authDomain: "ai-agent-b4f42.firebaseapp.com",
  projectId: "ai-agent-b4f42",
  storageBucket: "ai-agent-b4f42.firebasestorage.app",
  messagingSenderId: "428596869824",
  appId: "1:428596869824:web:f40a3df225bbd24acbcb25",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
