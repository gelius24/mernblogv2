// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e5213.firebaseapp.com",
  projectId: "mern-blog-e5213",
  storageBucket: "mern-blog-e5213.appspot.com",
  messagingSenderId: "271519255365",
  appId: "1:271519255365:web:91e499e64cd5d8451f8c2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);