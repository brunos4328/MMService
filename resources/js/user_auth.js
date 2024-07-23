// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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
const auth = getAuth(app);

// Verificar estado de autenticação
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Se não houver usuário logado, redirecionar para login_service.html
            window.location.href = "login_service.html";
        } else {
            console.log("Usuário logado:", user.uid);
        }
    });

    // Event listener para o botão de logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                console.log("Usuário deslogado com sucesso.");
                window.location.href = "../index.html";
            }).catch((error) => {
                console.error("Erro ao deslogar:", error);
            });
        });
    } else {
        console.error("Elemento logoutButton não encontrado no DOM.");
    }
});