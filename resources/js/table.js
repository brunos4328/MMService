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


// Função para salvar a tabela no Firebase
function saveTableToFirebase() {
    const table = document.getElementById('table');
    const rows = table.querySelectorAll('tbody tr');
    const scheduleData = [];

    rows.forEach((row, index) => {
        const rowData = {
            time: row.cells[0].innerText,
            monday: row.cells[1].innerText,
            tuesday: row.cells[2].innerText,
            wednesday: row.cells[3].innerText,
            thursday: row.cells[4].innerText,
            friday: row.cells[5].innerText,
            saturday: row.cells[6].innerText
        };
        scheduleData.push(rowData);
    });

    // Salva os dados no Firebase
    db.ref('schedule').set(scheduleData)
        .then(() => {
            alert('Tabela salva com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao salvar tabela: ', error);
        });
}

// Função para carregar a tabela do Firebase
function loadTableFromFirebase() {
    db.ref('schedule').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const table = document.getElementById('table');
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = ''; // Limpa a tabela atual

            data.forEach((rowData) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th contenteditable="true" scope="row">${rowData.time}</th>
                    <td contenteditable="true">${rowData.monday}</td>
                    <td contenteditable="true">${rowData.tuesday}</td>
                    <td contenteditable="true">${rowData.wednesday}</td>
                    <td contenteditable="true">${rowData.thursday}</td>
                    <td contenteditable="true">${rowData.friday}</td>
                    <td contenteditable="true">${rowData.saturday}</td>
                    <td>
                        <span class="table-up edit">
                            <button class="btn btn-sm indigo-text mx-1">
                                <i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i>
                            </button>
                        </span>
                        <span class="table-down edit">
                            <button class="btn btn-sm indigo-text">
                                <i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i>
                            </button>
                        </span>
                    </td>
                    <td>
                        <span class="table-remove edit">
                            <button type="button" class="table-remove btn btn-danger btn-rounded btn-sm my-0">Remove</button>
                        </span>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    });
}

// Chame loadTableFromFirebase() quando a página carregar para preencher a tabela
window.onload = function() {
    loadTableFromFirebase();
};

// Adicione um botão para salvar as alterações manualmente
document.querySelector('.table-add').addEventListener('click', saveTableToFirebase);
