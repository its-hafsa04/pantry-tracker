// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYYdQ-M-sE4KIeZFehjHneXJR8LKimxAQ",
  authDomain: "pantry-a6894.firebaseapp.com",
  projectId: "pantry-a6894",
  storageBucket: "pantry-a6894.appspot.com",
  messagingSenderId: "487684786814",
  appId: "1:487684786814:web:04ce5c42047c37c308662f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore};