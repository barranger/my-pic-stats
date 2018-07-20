import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyDiIYXdcaB7g4ZbIEu1g2DF9_DG9zdpRTc",
  authDomain: "my-pic-stats.firebaseapp.com",
  databaseURL: "https://my-pic-stats.firebaseio.com",
  projectId: "my-pic-stats",
  storageBucket: "my-pic-stats.appspot.com",
  messagingSenderId: "283809975349"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();


// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

  // Sign out
export const doSignOut = () => auth.signOut();

export const saveToken = (token) => {
  db.ref(`users/${auth.currentUser.uid}`).set({token});
}

export const getAccessToken = (cb) => {
  db.ref(`users/${auth.currentUser.uid}`).once("value").then(val => {
    const obj = val.val();
    cb(obj ? obj.token : null)
  })
 }
