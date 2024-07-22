// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const db = getFirestore(app);
const auth = getAuth(app);

async function fetchUsername(userEmail) {
    try {
      // Referência para a coleção 'users'
      const usersRef = collection(db, 'users');
      
      // Query para encontrar o usuário com o email especificado
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Se o documento foi encontrado, pegue o username
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData.username;
      } else {
        console.log('Nenhum usuário encontrado com este email.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o username:', error);
    }
  }

  async function fetchUsercode(userEmail) {
    try {
      // Referência para a coleção 'users'
      const usersRef = collection(db, 'users');
      
      // Query para encontrar o usuário com o email especificado
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Se o documento foi encontrado, pegue o username
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData.usercode;
      } else {
        console.log('Nenhum usuário encontrado com este email.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o username:', error);
    }
  }

  async function fetchUserphoto(userEmail) {
    try {
      // Referência para a coleção 'users'
      const usersRef = collection(db, 'users');
      
      // Query para encontrar o usuário com o email especificado
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Se o documento foi encontrado, pegue o username
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData.user-photo;
      } else {
        console.log('Nenhum usuário encontrado com este email.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o username:', error);
    }
  }


// Função para fazer o login do usuário
async function updateUI(user) {
    if (user) {
        // Usuário logado
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('user-photo').src = user.photoURL || 'https://via.placeholder.com/50';

        // Buscar o username do Firestore Database
        const username = await fetchUsername(user.email);
        document.getElementById('user-name').textContent = username || user.email || 'Nome do Usuário';
 
        // Buscar o username do Firestore Database
        const usercode = await fetchUsercode(user.email);
        document.getElementById('user-code').textContent = usercode || 'Codigo do Usuário';
 
        // Buscar o username do Firestore Database
        const usercode = await fetchUserphoto(user.email);
        document.getElementById('user-photo').textContent = user-photo || 'https://via.placeholder.com/50';
 
    } else {
        // Usuário não logado
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
    }
}

// Verifica o estado de autenticação ao carregar a página
auth.onAuthStateChanged(user => {
    updateUI(user);
});

// Função para redirecionar para a página de login
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Evento para o botão de login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-btn').addEventListener('click', redirectToLogin);
});