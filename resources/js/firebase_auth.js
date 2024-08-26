// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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

async function fetchUserDetails(userEmail) {
  try {
      // Referência para a coleção 'users'
      const usersRef = collection(db, 'users');
      
      // Query para encontrar o usuário com o email especificado
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
          // Se o documento foi encontrado, pegue os dados do usuário
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          return {
              username: userData.username,
              usercode: userData.usercode,
              category: userData.category,
              userphoto: userData.userphoto
          };
      } else {
          console.log('Nenhum usuário encontrado com este email.');
          return null;
      }
  } catch (error) {
      console.error('Erro ao buscar os detalhes do usuário:', error);
  }
}

// Função para fazer o login do usuário
async function updateUI(user) {
    if (user) {
      const userDetails = await fetchUserDetails(user.email);

        if (userDetails) {
        document.getElementById('user-name').textContent = userDetails.username || user.email || 'Nome do Usuário';

        document.getElementById('user-code').textContent = userDetails.usercode || 'Codigo do Usuário';

        document.getElementById('user-photo').src = userDetails.userphoto || 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';

          if (userDetails.category === 'Service') {
              document.getElementById('sidebar_service').style.display = 'inline-block';
          }
          else {
          }  

          if (userDetails.category === 'Spv') {
            document.getElementById('sidebar_spv').style.display = 'inline-block';
          }
          else {
          }  

          if (userDetails.category === 'Informatica') {
            document.getElementById('sidebar_informatica').style.display = 'inline-block';
          }
          else {
          } 

          if (userDetails.category === 'B2b') {
            document.getElementById('sidebar_b2b').style.display = 'inline-block';
            document.getElementById('sidebar_signin').style.display = 'inline-block';
          }
          else {
          }

          if (userDetails.category === 'Admin') {
            document.getElementById('sidebar_service').style.display = 'inline-block';
            document.getElementById('sidebar_spv').style.display = 'inline-block';
            document.getElementById('sidebar_informatica').style.display = 'inline-block';
            document.getElementById('sidebar_b2b').style.display = 'inline-block';
            document.getElementById('sidebar_signin').style.display = 'inline-block';
          }
          }
          else {
          }  

    } else {
        window.location.href = '/login.html';
    }
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listener para o botão de logout
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
      logoutButton.addEventListener("click", () => {
          signOut(auth).then(() => {
              console.log("Usuário deslogado com sucesso.");
              window.location.href = "/index.html";
          }).catch((error) => {
              console.error("Erro ao deslogar:", error);
          });
      });
  } else {
      console.error("Elemento logoutButton não encontrado no DOM.");
  }
});

// Verifica o estado de autenticação ao carregar a página
auth.onAuthStateChanged(user => {
    updateUI(user);
});

// Função para redirecionar para a página de login
function redirectToLogin() {
    window.location.href = '/login.html';
}

// Evento para o botão de login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-btn').addEventListener('click', redirectToLogin);
});