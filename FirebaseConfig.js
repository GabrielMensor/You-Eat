import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCmgqvcq-884hd0JGHAq0HoFHAo1weUK84",
    authDomain: "youcook-a0348.firebaseapp.com",
    projectId: "youcook-a0348",
    storageBucket: "youcook-a0348.appspot.com",
    messagingSenderId: "941323424715",
    appId: "1:941323424715:web:c20dd1716942922cb55c4e"
}

const app = initializeApp(firebaseConfig)
export const autht = getAuth(app)

const firebase = initializeApp(firebaseConfig);
export default firebase;