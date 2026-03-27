import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA33DUr85fe2gFyjRq_oBQRpBcQupjad3M",
  authDomain: "challenge06-ac2a9.firebaseapp.com",
  databaseURL: "https://challenge06-ac2a9-default-rtdb.firebaseio.com",
  projectId: "challenge06-ac2a9",
  storageBucket: "challenge06-ac2a9.firebasestorage.app",
  messagingSenderId: "620298323196",
  appId: "1:620298323196:web:fe128f105184f1a58e0379",
  measurementId: "G-KR4X4FZE88"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbFirestore = getFirestore(app);
export const dbRealtime = getDatabase(app);