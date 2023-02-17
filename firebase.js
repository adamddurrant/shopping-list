// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "shopping-list-9ec59.firebaseapp.com",
  projectId: "shopping-list-9ec59",
  storageBucket: "shopping-list-9ec59.appspot.com",
  messagingSenderId: "515698754491",
  appId: process.env.FIREBASE_AP_ID_KEY,
  measurementId: "G-S1R4PX27JD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
