// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx6fbNhIz3jRxg9hpzbJXhoI7g_9DlWg8",
  authDomain: "to-do-list-b51ec.firebaseapp.com",
  projectId: "to-do-list-b51ec",
  storageBucket: "to-do-list-b51ec.appspot.com",
  messagingSenderId: "566248041105",
  appId: "1:566248041105:web:aae2c75bbac4fd59a02d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const taskCollection = collection(db,"taskCollection");