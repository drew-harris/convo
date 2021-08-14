import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/remote-config";
import "firebase/analytics";
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
const remoteConfig = firebase.remoteConfig();
const functions = firebase.functions();
const analytics = firebase.analytics();

remoteConfig.settings.minimumFetchIntervalMillis = 90000;

remoteConfig.defaultConfig = {
  hype_message: "8/19",
  app_enabled: false,
};

remoteConfig
  .fetchAndActivate()
  .then(() => {
    console.log("Remote Config Fetch Status: ", remoteConfig.lastFetchStatus);
  })
  .catch((err) => {
    console.error(err.message);
  });

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const dbArrayUnion = firebase.firestore.FieldValue.arrayUnion;
const dbArrayRemove = firebase.firestore.FieldValue.arrayRemove;

// Set up emulators
if (window.location.hostname === "localhost" && allowEmulation) {
  console.log(
    "%cLocalhost: Using Emulators",
    "color:red; font-size:2rem;background-color:black;"
  );
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

export {
  auth,
  db,
  remoteConfig,
  timestamp,
  functions,
  dbArrayUnion,
  dbArrayRemove,
  analytics,
};
