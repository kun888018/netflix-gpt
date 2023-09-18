// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0EFJDoYox2ffXteUENMrHB3aTHcgsFp8",
  authDomain: "netflixgpt-b367c.firebaseapp.com",
  projectId: "netflixgpt-b367c",
  storageBucket: "netflixgpt-b367c.appspot.com",
  messagingSenderId: "511557589694",
  appId: "1:511557589694:web:5f816f4a87a11639bddcef",
  measurementId: "G-Y26J1KGESB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();