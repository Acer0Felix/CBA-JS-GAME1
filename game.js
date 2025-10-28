// Estado del juego
let currentPosition = 0; // 0-9 (10 casillas)
const gridSize = 10;

// Array de sprites por frame
const spriteFrames = [
    'sprite_1.png',
    'sprite_2.png',
    'sprite_3.png',
    'sprite_4.png',
    'sprite_5.png',
    'sprite_6.png',
    'sprite_7.png',
    'sprite_8.png',
    'sprite_9.png',
    'sprite_10.png'
];

// Inicializar el juego
function initGame() {
    const grid = document.getElementById('gameGrid');
    
    // Crear las 10 casillas
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = `cell-${i}`;
        grid.appendChild(cell);
    }
    
    // Agregar listener para las teclas
    document.addEventListener('keydown', handleKeyPress);
    
    // Agregar listeners para los botones
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    
    if (btnLeft) {
        btnLeft.addEventListener('click', moveLeft);
    }
    
    if (btnRight) {
        btnRight.addEventListener('click', moveRight);
    }
    
    // Agregar listeners para el modal
    document.getElementById('btnNewGame').addEventListener('click', restartGame);
    document.getElementById('btnExit').addEventListener('click', exitGame);
    
    // Actualizar visualización
    updateDisplay();
}

// Manejar las teclas presionadas
function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
}

// Mover a la izquierda
function moveLeft() {
    console.log('moveLeft llamado');
    if (currentPosition > 0) {
        currentPosition--;
        updateDisplay();
    }
}

// Mover a la derecha
function moveRight() {
    console.log('moveRight llamado');
    if (currentPosition < gridSize - 1) {
        currentPosition++;
        updateDisplay();
        
        // Verificar si llegó a la última posición
        if (currentPosition === gridSize - 1) {
            showCongratulationsModal();
        }
    }
}

// Mostrar modal de felicitaciones
function showCongratulationsModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('show');
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('show');
}

// Reiniciar juego
function restartGame() {
    currentPosition = 0;
    updateDisplay();
    closeModal();
}

// Cerrar juego (por ahora no hace nada)
function exitGame() {
    // Por ahora no hace nada
    alert('¡Gracias por jugar!');
}

// Actualizar la visualización
function updateDisplay() {
    // Limpiar todas las celdas
    for (let i = 0; i < gridSize; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.innerHTML = '';
        cell.classList.remove('has-sprite', 'active');
    }
    
    // Agregar el sprite en la posición actual
    const currentCell = document.getElementById(`cell-${currentPosition}`);
    const sprite = document.createElement('img');
    sprite.className = 'sprite';
    sprite.src = spriteFrames[currentPosition]; // Usar el frame correspondiente a la posición
    sprite.alt = 'Sprite';
    currentCell.appendChild(sprite);
    currentCell.classList.add('has-sprite');
    
    // Actualizar la posición en el texto
    document.getElementById('position').textContent = currentPosition + 1;
    
    // Agregar efecto visual a la casilla activa
    currentCell.classList.add('active');
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', initGame);

