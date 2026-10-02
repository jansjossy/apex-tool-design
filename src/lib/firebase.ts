import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Replace these placeholders with your actual keys from the Firebase Console
  apiKey: "AIzaSyClcNU0rrYqgXRapuADu6Gy11no1iDBtUU",
  authDomain: "apexdesign-1bf79.firebaseapp.com",
  projectId: "apexdesign-1bf79",
  storageBucket: "apexdesign-1bf79.appspot.com",
  messagingSenderId: "470632145892",
  appId: "1:470632145892:web:9baafa870c1aca53425df1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);