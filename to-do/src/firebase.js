import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDvT9boX5Y3S4yzRagGBvlntFxSUG4ZXSg",
    authDomain: "todo-app-with-amaanath-2210b.firebaseapp.com",
    databaseURL: "https://todo-app-with-amaanath-2210b.firebaseio.com",
    projectId: "todo-app-with-amaanath-2210b",
    storageBucket: "todo-app-with-amaanath-2210b.appspot.com",
    messagingSenderId: "450329810437",
    appId: "1:450329810437:web:7495395bfd2e03e6016e6c",
    measurementId: "G-QD1FH0SJQN"
  };

  const initApp = firebase.initializeApp(firebaseConfig);

const authM = initApp.auth();
const db = initApp.firestore();

export { authM, db };
