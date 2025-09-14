// Authentication functions
class AuthManager {
    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.init();
    }

    init() {
        // Listen for authentication state changes
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in:', user.email);
                // Only redirect to dashboard if we're on login or signup page
                if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
                    this.redirectToDashboard();
                }
            } else {
                console.log('User is signed out');
                // Only redirect to login if we're on dashboard page
                if (window.location.pathname.includes('dashboard.html')) {
                    window.location.href = 'login.html';
                }
            }
        });
    }

    // Sign up function
    async signUp(email, password, fullName) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Update user profile
            await user.updateProfile({
                displayName: fullName
            });

            // Save additional user data to Firestore
            await this.db.collection('users').doc(user.uid).set({
                fullName: fullName,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                role: 'donor' // Default role
            });

            this.showMessage('Account created successfully!', 'success');
            return user;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    // Sign in function
    async signIn(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            this.showMessage('Signed in successfully!', 'success');
            return userCredential.user;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    // Sign out function
    async signOut() {
        try {
            await this.auth.signOut();
            this.showMessage('Signed out successfully!', 'success');
            window.location.href = 'main.html';
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    // Password reset function
    async resetPassword(email) {
        try {
            await this.auth.sendPasswordResetEmail(email);
            this.showMessage('Password reset email sent!', 'success');
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    // Handle authentication errors
    handleAuthError(error) {
        let message = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This email is already registered.';
                break;
            case 'auth/invalid-email':
                message = 'Invalid email address.';
                break;
            case 'auth/weak-password':
                message = 'Password should be at least 6 characters.';
                break;
            case 'auth/user-not-found':
                message = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password.';
                break;
            case 'auth/too-many-requests':
                message = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                message = 'Network error. Please check your connection.';
                break;
        }
        
        this.showMessage(message, 'error');
    }

    // Show message to user
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
        `;

        document.body.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Redirect to dashboard
    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.auth.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.auth.currentUser;
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
