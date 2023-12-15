// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU1gBGWzkvsH9sOIQK8nlyDBfSqlI5SyA",
    authDomain: "furever-dd01e.firebaseapp.com",
    projectId: "furever-dd01e",
    storageBucket: "furever-dd01e.appspot.com",
    messagingSenderId: "397685152600",
    appId: "1:397685152600:web:8ce555f89d95ec02abe32d",
    measurementId: "G-PE8H4WKZX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)