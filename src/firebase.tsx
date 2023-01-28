// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBgFf-I-SCl-g8YOVCtkV58REvdPNIC7x8",
  authDomain: "gallery-bb657.firebaseapp.com",
  projectId: "gallery-bb657",
  storageBucket: "gallery-bb657.appspot.com",
  messagingSenderId: "332286823281",
  appId: "1:332286823281:web:235e93a3fb03084b56c4d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
