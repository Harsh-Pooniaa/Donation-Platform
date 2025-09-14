# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your donation website.

## Prerequisites
- A Google account
- Basic knowledge of web development

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "donation-website")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "donation-website-web")
6. Check "Also set up Firebase Hosting" if you plan to use it
7. Click "Register app"
8. Copy the Firebase configuration object

## Step 4: Update Configuration

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
};
```

## Step 5: Set Up Firestore Database (Optional)

If you want to store additional user data:

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 6: Test Your Setup

1. Open `main.html` in your browser
2. Click "Sign Up" to test user registration
3. Click "Login" to test user authentication
4. Check the Firebase Console to see registered users

## Security Rules (Important!)

For production, update your Firestore security rules:

1. Go to "Firestore Database" → "Rules"
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Included

### Authentication Features:
- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ Password reset functionality
- ✅ Remember me option
- ✅ Form validation
- ✅ Password strength indicator
- ✅ User role selection (Donor, NGO, Volunteer)
- ✅ Terms and conditions agreement

### UI Features:
- ✅ Modern, responsive design
- ✅ Loading states
- ✅ Success/error messages
- ✅ Password strength visualization
- ✅ Form validation feedback
- ✅ Mobile-friendly interface

### Dashboard Features:
- ✅ User profile display
- ✅ Statistics tracking
- ✅ Quick action buttons
- ✅ Sign out functionality

## File Structure

```
donation-website/
├── main.html              # Main landing page
├── login.html             # Login page
├── signup.html            # Signup page
├── dashboard.html         # User dashboard
├── style.css              # Main styles
├── auth-styles.css        # Authentication-specific styles
├── firebase-config.js     # Firebase configuration
├── auth.js               # Authentication logic
└── FIREBASE_SETUP.md     # This setup guide
```

## Troubleshooting

### Common Issues:

1. **"Firebase is not defined" error**
   - Make sure Firebase SDK scripts are loaded before your custom scripts
   - Check that the Firebase configuration is correct

2. **Authentication not working**
   - Verify that Email/Password authentication is enabled in Firebase Console
   - Check browser console for error messages

3. **CORS errors**
   - Make sure you're serving files from a web server (not file://)
   - Use a local development server like Live Server

### Getting Help:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Visit the [Firebase Support](https://firebase.google.com/support)

## Next Steps

After setting up authentication, you can:
1. Add more user profile fields
2. Implement donation tracking
3. Add NGO management features
4. Set up email notifications
5. Add social login options
6. Implement user roles and permissions

## Security Best Practices

1. Always validate data on both client and server side
2. Use Firebase Security Rules to protect your data
3. Never expose sensitive API keys in client-side code
4. Implement proper error handling
5. Use HTTPS in production
6. Regularly update Firebase SDKs
