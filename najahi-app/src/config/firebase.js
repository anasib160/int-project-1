import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhEL26-LX8TSfL-TcX6pdFAoRg_eDyxxU",
  authDomain: "edtech-593a2.firebaseapp.com",
  projectId: "edtech-593a2",
  storageBucket: "edtech-593a2.firebasestorage.app",
  messagingSenderId: "179277845177",
  appId: "1:179277845177:web:4f1127e53d1afa837a4168",
  measurementId: "G-EV7QQTLYBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;