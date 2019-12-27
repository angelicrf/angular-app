//const firebase = require('firebase');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

admin.initializeApp();
//firebase.firestore().settings({timestampsInSnapshots: true});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: gmailEmail,
    pass: gmailPassword
  }
});

const App_NAme = 'this is Angeliqiue Dashboard';
  async function sendWelcomeMessage(email, displayName){
    const mailOptions ={
      from: `${App_NAme} <thegrid.angyref@gmail.com>`,
      to:email
    };
    mailOptions.subject = `Welcome to ${App_NAme}`;
    mailOptions.text = ` Hey ${displayName || ''} ! Welcome to the team`;

    await mailTransport.sendMail(mailOptions);
    console.log("Welcome to the email: ", email);
    return null;

  }

exports.sendWelcomeEmail = functions.auth.user().onCreate(
  (user) => {
    const email = user.email;
    const displayName = user.displayName;

    return sendWelcomeMessage(email, displayName);
  }
);



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
