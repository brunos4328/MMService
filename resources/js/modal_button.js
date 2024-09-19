var modal = document.getElementById("encomendasModal");
var editModal = document.getElementById("editModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// Abrir o modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Fechar o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal quando clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}