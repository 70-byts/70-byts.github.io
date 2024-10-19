// Función para mostrar el mensaje "Feliz día Mamá"
window.onload = function() {
    const messageElement = document.getElementById('message');
    setTimeout(() => {
        messageElement.innerHTML = "Feliz día Mamá";
        messageElement.style.opacity = 1;
    }, 2000); // Aparece después de 2 segundos
};
