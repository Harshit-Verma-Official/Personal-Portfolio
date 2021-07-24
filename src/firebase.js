import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD6N2VFVqXkoay9pEoqgo1tKdvvZSG8Zrk",
  authDomain: "portfolio-43bfb.firebaseapp.com",
  databaseURL: "https://portfolio-43bfb.firebaseio.com",
  projectId: "portfolio-43bfb",
  storageBucket: "portfolio-43bfb.appspot.com",
  messagingSenderId: "848376137592",
  appId: "1:848376137592:web:17cec01db2d6e24268ea8d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
