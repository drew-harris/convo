import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { allowEmulation } from "../constants";

const firebaseConfig = {
  apiKey: "AIzaSyDHY0lS9b-QZm9csAY9JVSSgQizNwsSuno",
  authDomain: "convo-0.firebaseapp.com",
  projectId: "convo-0",
  storageBucket: "convo-0.appspot.com",
  messagingSenderId: "154449697709",
  appId: "1:154449697709:web:5e10c9d7c0313c10efdf24",
  measurementId: "G-Z19713245B",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;

// Set up emulators
if (window.location.hostname === "localhost" && allowEmulation) {
  console.log(
    "%cLocalhost: Using Emulators",
    "color:red; font-size:2rem;background-color:black;"
  );
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", 8080);
}

export { auth, db, timestamp };
