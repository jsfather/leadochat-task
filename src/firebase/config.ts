import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcWOkML459EM5nA-MwK1LFSqWDlcmlFIA",
  authDomain: "leadochat-task.firebaseapp.com",
  projectId: "leadochat-task",
  storageBucket: "leadochat-task.firebasestorage.app",
  messagingSenderId: "99663693481",
  appId: "1:99663693481:web:496c2ae6d72c65c1c80bb8",
  measurementId: "G-DDSVXCSH6N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
