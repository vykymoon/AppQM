// src/firebase.js
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCK7PLyaQVQ5YFc3rXDwiZfwG_zXeL2L-c",
    authDomain: "quickmealreact.firebaseapp.com",
    projectId: "quickmealreact",
    storageBucket: "quickmealreact.firebasestorage.app",
    messagingSenderId: "892001502038",
    appId: "1:892001502038:web:308a974033b9b24ea70cf7",
    measurementId: "G-BRPYK82X9W"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


export const auth = getAuth(app);

export default app;

export const db = getFirestore(app);