import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCtKoPwbV7c7WCvXiOKFhOqZivqfL4I3l4",
    authDomain: "desopm-challenge05.firebaseapp.com",
    projectId: "desopm-challenge05",
    storageBucket: "desopm-challenge05.firebasestorage.app",
    messagingSenderId: "533000763914",
    appId: "1:533000763914:web:61d774091f7797fec3fdf3",
    measurementId: "G-JP4BC44V9Y"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
