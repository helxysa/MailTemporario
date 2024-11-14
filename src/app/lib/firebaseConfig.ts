import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDh8ajaMKwGAwRQ2T1RBGRn2UYs6nCdrTQ",
    authDomain: "tempmail-fc175.firebaseapp.com",
    projectId: "tempmail-fc175",
    storageBucket: "tempmail-fc175.firebasestorage.app",
    messagingSenderId: "523232906884",
    appId: "1:523232906884:web:6365b564dbc47f8c0e7cd1",
    measurementId: "G-FJT7VVJSB5"
  }

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebaseConfig;