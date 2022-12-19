// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCICXzxDmmdo_jyD2BwZlzkMWL0no8zvL8",
  authDomain: "eventbarcode-add03.firebaseapp.com",
  projectId: "eventbarcode-add03",
  storageBucket: "eventbarcode-add03.appspot.com",
  messagingSenderId: "651261542897",
  appId: "1:651261542897:web:5dd0223b8eef6bb8c34450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app);

export { db }

export { auth }