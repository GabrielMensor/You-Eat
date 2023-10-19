import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmgqvcq-884hd0JGHAq0HoFHAo1weUK84",
  authDomain: "youcook-a0348.firebaseapp.com",
  projectId: "youcook-a0348",
  storageBucket: "youcook-a0348.appspot.com",
  messagingSenderId: "941323424715",
  appId: "1:941323424715:web:c20dd1716942922cb55c4e"
};

initializeApp(firebaseConfig);
export const database = getFirestore();