import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQrSx1p1SKf6J8eINZ5GKwrt1lHyW9uBg",
  authDomain: "clancore-e8c0a.firebaseapp.com",
  projectId: "clancore-e8c0a",
  storageBucket: "clancore-e8c0a.firebasestorage.app",
  messagingSenderId: "965477535008",
  appId: "1:965477535008:web:e3d08c4dd8735586ba9b45"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
