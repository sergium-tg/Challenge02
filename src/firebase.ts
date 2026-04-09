import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB1-vdCNujIGIinsywj2H2zJ4Ezf2_c0fo",
  authDomain: "desopm-challenge07.firebaseapp.com",
  projectId: "desopm-challenge07",
  storageBucket: "desopm-challenge07.firebasestorage.app",
  messagingSenderId: "270997033309",
  appId: "1:270997033309:web:bfa5d3757991fa62cc58b4",
  measurementId: "G-6Y05E825HQ"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);