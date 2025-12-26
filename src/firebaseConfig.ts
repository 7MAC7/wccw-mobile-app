import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWc1Wz4mBz9OkI9zXfLgwnssIW42AQbsA",
  authDomain: "wccw-app.firebaseapp.com",
  projectId: "wccw-app",
  storageBucket: "wccw-app.appspot.com",
  messagingSenderId: "1065705333108",
  appId: "너의 appId"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);