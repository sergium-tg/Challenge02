import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmzUM9p426typBEdy5iTEf7ln2qCHHBaA",
  authDomain: "parcial2-57d8f.firebaseapp.com",
  projectId: "parcial2-57d8f",
  storageBucket: "parcial2-57d8f.firebasestorage.app",
  messagingSenderId: "776954976260",
  appId: "1:776954976260:web:30ed80b074932450207d51",
  measurementId: "G-W9GSN4PVRK"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const dbFirebase = getFirestore(app);
export const auth = getAuth(app);