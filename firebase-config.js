// Firebase configuration
// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_domain.firebaseapp.com",
    projectId: "your_project_Id",
    storageBucket: "your_project-Id.appspot.com",
    messagingSenderId: "your_sender_ID",
    appId: "your_app_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Firestore
const db = firebase.firestore();
