import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBRsL3RT9887ycZtgHeAORhBGhnmsMcJa0",
  authDomain: "react-auth-a4f15.firebaseapp.com",
  projectId: "react-auth-a4f15",
  storageBucket: "react-auth-a4f15.appspot.com",
  messagingSenderId: "985520348970",
  appId: "1:985520348970:web:c4d4f847357347c7800853",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
