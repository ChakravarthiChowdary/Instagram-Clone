import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC8AVqZ6iowe1_QApT6t60w0zXDDMDq9zE",
  authDomain: "instagramclone-7d3e0.firebaseapp.com",
  projectId: "instagramclone-7d3e0",
  storageBucket: "instagramclone-7d3e0.appspot.com",
  messagingSenderId: "400463516470",
  appId: "1:400463516470:web:876e983ddec1da28705997",
  measurementId: "G-3TCVY94CFM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
