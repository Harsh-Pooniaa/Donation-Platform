// Firebase configuration
// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7Rm4WBx5lGLLoCCao4EjJkDq9C78j8UM",
    authDomain: "donateclothing-7efe0.firebaseapp.com",
    projectId: "donateclothing-7efe0",
    storageBucket: "donateclothing-7efe0.appspot.com",
    messagingSenderId: "882145157583",
    appId: "1:882145157583:web:5ebafaba871e36f37332ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Firestore
const db = firebase.firestore();
