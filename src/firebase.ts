// Import the Firebase modules that you need in your app.
import * as firebase from 'firebase';
// Initalize and export Firebase.
const config = {
    apiKey: "AIzaSyCeq6jN_3bF-0TSvL7VSUCwVu-mo9HEUKs",
    authDomain: "flipcl-1.firebaseapp.com",
    databaseURL: "https://flipcl-1.firebaseio.com",
    projectId: "flipcl-1",
    storageBucket: "flipcl-1.appspot.com",
    messagingSenderId: "885304934299"
}
export default firebase.initializeApp(config);
