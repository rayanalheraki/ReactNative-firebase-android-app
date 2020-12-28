import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAyYvR1mL5laSVYQgGL0VuZ5f73A9PgFqo",
    authDomain: "groupnotes-9aed8.firebaseapp.com",
    databaseURL: "https://groupnotes-9aed8-default-rtdb.firebaseio.com",
    projectId: "groupnotes-9aed8",
    storageBucket: "groupnotes-9aed8.appspot.com",
    messagingSenderId: "1064109514798",
    appId: "1:1064109514798:web:c371ff34a7f95084a43fbf",
    measurementId: "G-FXZ25XYG64"
  };
  
  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  
  