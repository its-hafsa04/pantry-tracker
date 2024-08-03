import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Firebase configuration
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
const storage = getStorage(app);

export {firestore,storage};