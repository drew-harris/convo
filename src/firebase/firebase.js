import firebase from "firebase/app";
import "firebase/auth";
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

// Set up emulators
if (window.location.hostname === "localhost" && allowEmulation) {
  console.log("Localhost: Using Emulators");
  auth.useEmulator("http://localhost:9099");
}

export { auth };
