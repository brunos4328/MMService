// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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

async function uploadImage(file, userId) {
    try {
        const fileName = `${userId}_${file.name}`; // Nome do arquivo no Storage
        const fileRef = storageRef(storage, `objetivos/${fileName}`); // Cria uma referência para o arquivo


        // Faz o upload do arquivo
        const snapshot = await uploadBytes(fileRef, file);

        // Obtém a URL do arquivo no Storage
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Salva a URL no Firestore
        await saveImageUrlToFirestore(userId, downloadURL);

        console.log('Imagem enviada com sucesso:', downloadURL);
    } catch (error) {
        console.error('Erro ao fazer o upload da imagem:', error);
    }
}

async function saveImageUrlToFirestore(userId, downloadURL) {
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('usercode', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(userDoc.ref, {
                objetivos: arrayUnion(downloadURL)
            });
            console.log('URL da imagem salva no Firestore.');
        } else {
            console.log('Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao salvar a URL da imagem no Firestore:', error);
    }
}


document.getElementById('upload-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('image-upload');
    const file = fileInput.files[0];

    if (file) {
        const user = auth.currentUser;
        if (user) {
            await uploadImage(file, user.uid);
        } else {
            console.log('Usuário não autenticado.');
        }
    } else {
        console.log('Nenhum arquivo selecionado.');
    }
});

let slideIndex = 1;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

async function loadSlideshowImages() {
    try {
        const user = auth.currentUser;
        if (user) {
            const userRef = collection(db, 'users');
            const q = query(userRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                if (userData.objetivos && userData.objetivos.length > 0) {
                    renderSlideshow(userData.objetivos);
                } else {
                    console.log('Nenhum objetivo encontrado para o usuário.');
                }
            } else {
                console.log('Usuário não encontrado.');
            }
        } else {
            console.log('Usuário não autenticado.');
        }
    } catch (error) {
        console.error('Erro ao carregar imagens do slideshow:', error);
    }
}

function renderSlideshow(imageUrls) {
    console.log(imageUrls);  // Adicionado para ver as URLs carregadas
    const slideshowContainer = document.getElementById('slideshow');
    slideshowContainer.innerHTML = '';  // Limpa o conteúdo atual

    imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.classList.add('mySlides', 'fade');

        const img = document.createElement('img');
        img.src = url;
        img.style.width = '100%';

        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });

    showSlides(1);  // Inicia o slideshow
}
