import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCn3hX6Ly6Pn1fZ1jdqptm_8MVHv0o5Xew",
    authDomain: "anime-317bf.firebaseapp.com",
    projectId: "anime-317bf",
    storageBucket: "anime-317bf.appspot.com",
    messagingSenderId: "866315657720",
    appId: "1:866315657720:web:773abaa15abb24fdf8f60d",
    measurementId: "G-ZPGW0V75RD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export {firebase, db, auth, storage};