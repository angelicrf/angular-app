
var admin = require("firebase-admin");
var uid = process.argv[2];

var serviceAccount = require("./data-dashboard-213fc-firebase-adminsdk-egxhi-daa883c6fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://data-dashboard-213fc.firebaseio.com"
});
admin.auth().setCustomUserClaims(uid, {admin: true})
.then(() => {
  console.log("custom claims set for the user", uid);
  process.exit();
}).catch(error => {
  console.log("error is:", error);
  process.exit(1);
});
