// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1eZ2nVQshLUdPXT7lVGapIEfV7FyNGwM",
    authDomain: "shoppinglist-74406.firebaseapp.com",
    databaseURL: "https://shoppinglist-74406-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-74406",
    storageBucket: "shoppinglist-74406.appspot.com",
    messagingSenderId: "906917068779",
    appId: "1:906917068779:web:d6ea03ef97ffe2817863ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)