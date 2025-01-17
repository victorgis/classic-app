// import { initializeApp } from "firebase/app";
import { getApp, initializeApp } from '@react-native-firebase/app';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5JOqNQq-G0Tuulr5SX1g7yhakq9r5Cc",
  authDomain: "https://xqcfakcvarfbtfngawsd.supabase.co",
  projectId: "classicapp-76d37",
  storageBucket: "classicapp-76d37.firebasestorage.app",
  messagingSenderId: "876894159980",
  appId: "1:876894159980:android:93bdf5aba1e49950e34449",
  measurementId: "G-VN1T6X667Z",
};

// Initialize Firebase only if not already initialized
const appFirebase = initializeApp(firebaseConfig);



const firebaseApp = getApp();

console.log("firebaseApp", firebaseApp)



export default appFirebase;
