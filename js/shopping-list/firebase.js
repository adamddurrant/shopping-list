import FIREBASE_API_KEY from "./config.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "shopping-list-9ec59.firebaseapp.com",
  projectId: "shopping-list-9ec59",
  storageBucket: "shopping-list-9ec59.appspot.com",
  messagingSenderId: "515698754491",
  appId: "1:515698754491:web:bb9d20722f631c43e23a9e",
  measurementId: "G-S1R4PX27JD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
