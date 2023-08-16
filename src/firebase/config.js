// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDNoXkLY-4pFnbYcsoeBOyV8q7ciwrS-mQ",
    authDomain: "chat-app-42757.firebaseapp.com",
    projectId: "chat-app-42757",
    storageBucket: "chat-app-42757.appspot.com",
    messagingSenderId: "809857555177",
    appId: "1:809857555177:web:53f9a193a81ab29ac4ae78",
    measurementId: "G-MGSHYE5Z59"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
    auth.useEmulator('http://localhost:9099');
    db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;