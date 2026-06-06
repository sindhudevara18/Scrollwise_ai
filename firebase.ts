
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCbmjwpk_BqW7nv9lG6rGKXPLWKumhWuNc",
  authDomain: "scrollwise-ai-74e02.firebaseapp.com",
  projectId: "scrollwise-ai-74e02",
  storageBucket: "scrollwise-ai-74e02.firebasestorage.app",
  messagingSenderId: "957783124393",
  appId: "1:957783124393:web:f5d56c741b05b49cc47cb8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);