import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd7uPVLcbBIgxjkBmdTbBmo8on2WTN6uI",
    authDomain: "sling-cafe-admin.firebaseapp.com",
    databaseURL: "https://sling-cafe-admin.firebaseio.com",
    projectId: "sling-cafe-admin",
    storageBucket: "sling-cafe-admin.appspot.com",
    messagingSenderId: "764979690299",
    appId: "1:764979690299:web:cf4b718901bd23393b951e",
    measurementId: "G-RN33924R1V"
  };

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const db = myFirebase.firestore();
