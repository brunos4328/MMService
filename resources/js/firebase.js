// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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
const analytics = getAnalytics(app);
const  auth = getAuth();
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");

login.addEventListener('click',(e)=>{

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            const dt = new Date();
            update(ref(database, 'users/' + user.uid),{
                last_login: dt,
            })

            window.location.href= "service.html"

            alert('User loged in!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });
})

signUp.addEventListener('click',(e)=>{

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username =document.getElementById('username').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        set(ref(database, 'users/' + user.uid),{
            username: username,
            email: email,
            password: password
        })
        alert('user created!');
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        alert(errorMessage);
    });
})

exports.myfunction = functions.https.onCall((data, context) => {  
    const someString = "Hello World!";
    const encryptedString = SHA256(someString);
    // or
    const encryptedString = AES(someString);
  
    return encryptedString;
  })