// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { SHA256 } from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyD77kJw5I1BPMOX0DqCWpPzzf8IO4Jdovo",
authDomain: "media-service-6adf4.firebaseapp.com",
databaseURL: "https://media-service-6adf4-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "media-service-6adf4",
storageBucket: "media-service-6adf4.appspot.com",
messagingSenderId: "953513774849",
appId: "1:953513774849:web:e84c4db2e2d22148bb1500",
measurementId: "G-PM1NHZMQ1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const  auth = getAuth(app);
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");

// Function to register new user
async function registerUser(email, username, password) {
    try {
        // Encrypt the password
        const encryptedPassword = SHA256(password).toString();

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            username: username,
            password: encryptedPassword
        });

        console.log("User registered and data saved successfully.");
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

// Register button event listener
        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("registerButton").addEventListener("click", (event) => {
                event.preventDefault();
                const email = document.getElementById("email").value;
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                registerUser(email, username, password);
            });
        });