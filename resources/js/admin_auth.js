// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
const storage = getStorage(app);

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

async function updateUI(user) {
    if (user) {
        const userDetails = await fetchUserDetails(user.email);

        if (userDetails) {
            
            if (userDetails.category === 'Admin' || userDetails.category === 'B2b') {
                console.log('Usuário administrador');
            }
            else {
                window.location.href = "../../../index.html";
            }

        } else {
            console.log("Nenhum detalhe do usuário encontrado.");
        }
    } else {
        window.location.href = "../../../login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listener para o botão de logout
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
      logoutButton.addEventListener("click", () => {
          signOut(auth).then(() => {
              console.log("Usuário deslogado com sucesso.");
              window.location.href = "../../../login.html";
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