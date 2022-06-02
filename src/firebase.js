import firebase from "firebase"

  const firebaseConfig = {
    apiKey: "AIzaSyBkuBRXeV9HRJTM6et5UzGES9NqSiO06ys",
    authDomain: "clone-73a15.firebaseapp.com",
    projectId: "clone-73a15",
    storageBucket: "clone-73a15.appspot.com",
    messagingSenderId: "879199228952",
    appId: "1:879199228952:web:ed287f59e23cfe29879f6d",
    measurementId: "G-YLQQRC2YGP"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };