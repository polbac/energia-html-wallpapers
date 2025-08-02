// Variables para controlar el timer y el estado de las imágenes
let timer;
let currentImageIndex = 0;
let images;

// Función para obtener las imágenes
function getImages() {
    if (!images) {
        images = document.querySelectorAll('.imagen-amarilla, .imagen-negra');
    }
    return images;
}

// Función para agregar la clase expansion a una imagen específica
function addExpansionClass(imageIndex) {
    const imageElements = getImages();
    
    // Remover la clase expansion de todas las imágenes
    imageElements.forEach(img => {
        img.classList.remove('expansion');
    });
    
    // Agregar la clase expansion a la imagen actual
    if (imageElements[imageIndex]) {
        imageElements[imageIndex].classList.add('expansion');
        console.log('Clase expansion agregada a imagen:', imageIndex);
    }
}

// Función para alternar entre las imágenes
function toggleExpansion() {
    addExpansionClass(currentImageIndex);
    
    // Cambiar al siguiente índice (0 o 1)
    currentImageIndex = (currentImageIndex + 1) % getImages().length;
}

// Función para iniciar el timer
function startTimer() {
    // Verificar que las imágenes existan
    const imageElements = getImages();
    if (imageElements.length === 0) {
        console.log('No se encontraron imágenes, reintentando en 100ms...');
        setTimeout(startTimer, 100);
        return;
    }
    
    console.log('Iniciando timer con', imageElements.length, 'imágenes');
    
    // Ejecutar inmediatamente la primera vez
    toggleExpansion();
    
    // Configurar el timer para ejecutar cada 20 segundos
    timer = setInterval(toggleExpansion, 20000);
}

// Iniciar el timer cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando timer...');
    startTimer();
});

// También intentar iniciar cuando la ventana se carga completamente
window.addEventListener('load', function() {
    console.log('Ventana cargada completamente');
    if (!timer) {
        startTimer();
    }
});

// Función para detener el timer (opcional, para debugging)
function stopTimer() {
    if (timer) {
        clearInterval(timer);
        console.log('Timer detenido');
    }
} 