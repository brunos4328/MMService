// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
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

// Função para lidar com o upload de fotos

let cropper;



function handlePhotoUpload(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const image = document.getElementById('imageToCrop');
            image.src = e.target.result;

            // Exibir o modal de recorte
            document.getElementById('cropperModal').style.display = 'block';

            // Inicializar o Cropper.js
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                minContainerWidth: 400,
                minContainerHeight: 400
            });
        }
        reader.readAsDataURL(file);
    }
}



async function cropAndUploadImage() {
    const user = auth.currentUser;
    if (user && cropper) {
        const canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 300
        });
        canvas.toBlob(async (blob) => {
            const storageReference = storageRef(storage, `user_photos/${user.uid}/${Date.now()}.png`);
            try {
                await uploadBytes(storageReference, blob);
                const downloadURL = await getDownloadURL(storageReference);
                await updateDoc(doc(db, 'users', user.uid), {
                    userphoto: downloadURL
                });
                document.getElementById('user-photo').src = downloadURL;
                console.log("Foto de perfil atualizada com sucesso.");
            } catch (error) {
                console.error("Erro ao fazer upload da foto:", error);
            }
        }, 'image/png');
    }
}



// Verificar estado de autenticação
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Se não houver usuário logado, redirecionar para login_service.html
            window.location.href = "index.html";
        } else {
            console.log("Usuário logado:", user.uid);
            updateUI(user);
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

    const userPhoto = document.getElementById('user-photo');
    const fileInput = document.getElementById('fileInput');
    const cropButton = document.getElementById('cropButton');
    const cancelButton = document.getElementById('cancelButton');

    if (userPhoto && fileInput && cropButton && cancelButton) {
        userPhoto.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', handlePhotoUpload);
        cropButton.addEventListener('click', async () => {
            await cropAndUploadImage();
            document.getElementById('cropperModal').style.display = 'none';
        });

        cancelButton.addEventListener('click', () => {
            document.getElementById('cropperModal').style.display = 'none';
            if (cropper) {
                cropper.destroy();
            }
        });
    } else {
        console.error("Elementos user-photo, fileInput, cropButton ou cancelButton não encontrados no DOM.");
    }
});

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
      console.error('Erro ao buscar o usercode:', error);
    }
  }

  async function fetchUserphone(userEmail) {
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
        return userData.userphone;
      } else {
        console.log('Nenhum usuário encontrado com este email.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o userphone:', error);
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
        return userData.userphoto;
      } else {
        console.log('Nenhum usuário encontrado com este email.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o userphoto:', error);
    }
  }
  

  // Função para salvar o perfil do usuário
async function saveUserProfile() {
    const user = auth.currentUser;
    if (user) {
        // Obter os valores dos campos de entrada
        const userName = document.getElementById('user-name-input').value;
        const userPhone = document.getElementById('user-phone-input').value;
        const userCode = document.getElementById('user-code-input').value;

        try {
            // Atualizar o documento do usuário no Firestore
            await updateDoc(doc(db, 'users', user.uid), {
                username: userName,
                userphone: userPhone,
                usercode: userCode
            });
            console.log("Perfil do usuário atualizado com sucesso.");
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o perfil do usuário:", error);
            alert("Erro ao atualizar o perfil. Por favor, tente novamente.");
        }
    } else {
        console.log("Nenhum usuário logado.");
        alert("Nenhum usuário logado.");
    }
}

// Adicionar event listener ao botão de salvar perfil
document.addEventListener("DOMContentLoaded", () => {
    const saveProfileButton = document.getElementById('saveProfileButton');
    if (saveProfileButton) {
        saveProfileButton.addEventListener('click', saveUserProfile);
    } else {
        console.error("Elemento saveProfileButton não encontrado no DOM.");
    }
});

async function updateUI(user) {
    if (user) {
        // Buscar o username do Firestore Database
        const username = await fetchUsername(user.email);
        document.getElementById('user-name').textContent = username || user.email || 'Nome do Usuário';
        document.getElementById('user-name-input').value = username || '';
 
        // Buscar o username do Firestore Database
        const usercode = await fetchUsercode(user.email);
        document.getElementById('user-code').textContent = usercode || 'Codigo do Usuário';
        document.getElementById('user-code-input').value = usercode || '';

       // Buscar o userphoto do Firestore Database
       const userphoto = await fetchUserphoto(user.email);
       document.getElementById('user-photo').src = userphoto || 'https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';

       document.getElementById('user-email').textContent = user.email;
       document.getElementById('user-email-input').value = user.email;

       // Supondo que você armazene o número de telefone em 'phone' no Firestore
       const userPhone = await fetchUserphone(user.email); // Você precisa implementar esta função para buscar o número de telefone
       document.getElementById('user-phone-input').value = userPhone || '';

    } else {
        // Usuário não logado
        window.location.href = "index.html";
    }
}

// Verifica o estado de autenticação ao carregar a página
auth.onAuthStateChanged(user => {
    updateUI(user);
});