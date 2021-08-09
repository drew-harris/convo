const functions = require("firebase-functions");
const firebase_tools = require("firebase-tools");
const admin = require("firebase-admin");
var serviceAccount = require("./convo-0-firebase-adminsdk-casek-0aca63dc64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onCall(async (data, context) => {
    // Only allow admin users to execute this function.
    //if (false) {
    //throw new functions.https.HttpsError(
    //"permission-denied",
    //"Must be an administrative user to initiate delete."
    //);
    //}

    const path = "/groups/" + data.path;
    console.log(`User has requested to delete path ${path}`);

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
    });

    return {
      path: path,
    };
  });
