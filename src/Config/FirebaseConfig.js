// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// for auth
import {getAuth} from "firebase/auth";

// for storage
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeR7Vv2kjq-LJNrgfaFFn93tawRiXMPOs",
  authDomain: "blog-1e3ff.firebaseapp.com",
  projectId: "blog-1e3ff",
  storageBucket: "blog-1e3ff.appspot.com",
  messagingSenderId: "246342716339",
  appId: "1:246342716339:web:837ba7226da2515bb0d9c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setup database and export it
export const db = getFirestore(app)

// setup auth and export it
export const auth = getAuth(app)

// set storage, export it and activate it
export const storage = getStorage(app)