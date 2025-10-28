# Documentación Técnica del Código

## Índice
1. [Estructura HTML](#estructura-html)
2. [Código JavaScript](#código-javascript)
3. [Flujo de Ejecución](#flujo-de-ejecución)
4. [Funciones Principales](#funciones-principales)
5. [Variables Globales](#variables-globales)

---

## Estructura HTML

### Archivo: `index.html`

El archivo HTML está compuesto por los siguientes elementos:

#### 1. **Estructura Base (líneas 1-8)**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Grilla 1x10</title>
    <link rel="stylesheet" href="styles.css">
</head>
```
- Define el documento como HTML5 en español
- Establece la codificación UTF-8
- Configura la vista para dispositivos móviles
- Enlaza la hoja de estilos CSS

#### 2. **Contenedor Principal (líneas 10-27)**
```html
<div class="container">
    <h1>Juego de Grilla</h1>
    <p class="instructions">Usa las flechas del teclado ← → o los botones para mover el sprite</p>
    <div class="grid-container">
        <div class="grid" id="gameGrid"></div>
    </div>
    <div class="controls">...</div>
    <div class="info">...</div>
</div>
```

**Elementos:**
- **`h1`**: Título del juego
- **`p.instructions`**: URL de instrucciones para el usuario
- **`div#gameGrid`**: Contenedor que será poblado dinámicamente con 10 casillas por JavaScript
- **`div.controls`**: Contenedor para los botones de control
- **`div.info`**: Muestra la posición actual del sprite

#### 3. **Botones de Control (líneas 16-23)**
```html
<div class="controls">
    <button class="control-btn" id="btnLeft">
        <img src="btn-left.png" alt="Flecha Izquierda" class="btn-image" />
    </button>
    <button class="control-btn" id="btnRight">
        <img src="btn-right.png" alt="Flecha Derecha" class="btn-image" />
    </button>
</div>
```

**Características:**
- Botones con ID único para identificación en JavaScript
- Cada botón contiene una imagen (`btn-left.png` / `btn-right.png`)
- Las imágenes tienen la clase `btn-image` para estilizado
- `alt` text para accesibilidad

#### 4. **Información de Posición (líneas 24-26)**
```html
<div class="info">
    <p>Posición actual: <span id="position">1</span></p>
</div>
```
- Muestra el número de posición actual (1-10)
- El contenido del `span#position` se actualiza dinámicamente por JavaScript

#### 5. **Modal de Felicitaciones (líneas 29-39)**
```html
<div class="modal-overlay" id="modalOverlay">
    <div class="modal">
        <h2 class="modal-title">¡Felicitaciones!</h2>
        <p class="modal-message">Has llegado al final de la grilla</p>
        <div class="modal-buttons">
            <button class="modal-btn btn-primary" id="btnNewGame">De Nuevo</button>
            <button class="modal-btn btn-secondary" id="btnExit">Salir</button>
        </div>
    </div>
</div>
```

**Funcionalidad:**
- Se muestra cuando el sprite llega a la última posición (posición 10)
- Contiene dos botones:
  - **`btnNewGame`**: Reinicia el juego
  - **`btnExit`**: Muestra mensaje de despedida
- Inicialmente oculto (se muestra mediante JavaScript)

#### 6. **Script de JavaScript (línea 41)**
```html
<script src="game.js"></script>
```
- Carga el archivo JavaScript que contiene toda la lógica del juego
- Se ejecuta después de que el HTML se carga

---

## Código JavaScript

### Archivo: `game.js`

#### Variables Globales

##### 1. **Estado del Juego (líneas 1-3)**
```javascript
let currentPosition = 0; // 0-9 (10 casillas)
const gridSize = 10;
```
- **`currentPosition`**: Variable mutable que guarda la posición actual del sprite (0-9)
- **`gridSize`**: Constante que define el tamaño de la grilla (10 casillas)

##### 2. **Array de Sprites (líneas 5-17)**
```javascript
const spriteFrames = [
    'sprite_1.png',
    'sprite_2.png',
    'sprite_3.png',
    // ... hasta sprite_10.png
];
```
- Array que contiene los nombres de archivos de los 10 sprites
- Cada posición del array corresponde a una casilla
- Sistema de frames donde cada casilla muestra un sprite diferente

---

## Funciones Principales

### 1. **initGame()** - Líneas 19-52

**Propósito:** Inicializa el juego configurando la grilla y los event listeners.

```javascript
function initGame() {
    const grid = document.getElementById('gameGrid');
    
    // Crear las 10 casillas
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = `cell-${i}`;
        grid.appendChild(cell);
    }
    
    // Event listeners...
    document.addEventListener('keydown', handleKeyPress);
    
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    
    if (btnLeft) {
        btnLeft.addEventListener('click', moveLeft);
    }
    if (btnRight) {
        btnRight.addEventListener('click', moveRight);
    }
    
    document.getElementById('btnNewGame').addEventListener('click', restartGame);
    document.getElementById('btnExit').addEventListener('click', exitGame);
    
    updateDisplay();
}
```

**Proceso:**
1. Obtiene el contenedor `#gameGrid`
2. Crea 10 elementos `div` dinámicamente con clases e IDs
3. Agrega event listeners:
   - Para teclas del teclado (flechas)
   - Para botones de control (izquierda/derecha)
   - Para botones del modal (nuevo juego/salir)
4. Llama a `updateDisplay()` para mostrar el estado inicial

---

### 2. **handleKeyPress(event)** - Líneas 54-61

**Propósito:** Maneja los eventos de teclado.

```javascript
function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
}
```

**Funcionamiento:**
- Escucha eventos de `keydown` en todo el documento
- Detecta flechas izquierda (`ArrowLeft`) y derecha (`ArrowRight`)
- Llama a las funciones correspondientes

---

### 3. **moveLeft()** - Líneas 63-70

**Propósito:** Mueve el sprite una casilla hacia la izquierda.

```javascript
function moveLeft() {
    console.log('moveLeft llamado');
    if (currentPosition > 0) {
        currentPosition--;
        updateDisplay();
    }
}
```

**Lógica:**
- Verifica que no esté en la posición 0 (primera casilla)
- Decrementa `currentPosition` en 1
- Actualiza la visualización
- Si está en la posición 0, no hace nada

---

### 4. **moveRight()** - Líneas 72-84

**Propósito:** Mueve el sprite una casilla hacia la derecha.

```javascript
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
```

**Lógica:**
- Verifica que no esté en la última posición (`gridSize - 1`)
- Incrementa `currentPosition` en 1
- Actualiza la visualización
- Si llega a la última posición (9), muestra el modal de felicitaciones

---

### 5. **updateDisplay()** - Líneas 111-134

**Propósito:** Actualiza toda la interfaz visual del juego.

```javascript
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
    sprite.src = spriteFrames[currentPosition];
    sprite.alt = 'Sprite';
    currentCell.appendChild(sprite);
    currentCell.classList.add('has-sprite');
    
    // Actualizar la posición en el texto
    document.getElementById('position').textContent = currentPosition + 1;
    
    // Agregar efecto visual a la casilla activa
    currentCell.classList.add('active');
}
```

**Proceso:**
1. **Limpia todas las celdas:** Elimina HTML y clases CSS de todas las casillas
2. **Obtiene la casilla actual:** Selecciona la casilla según `currentPosition`
3. **Crea el sprite:** Genera dinámicamente un elemento `<img>`
4. **Asigna el sprite correcto:** Usa `spriteFrames[currentPosition]` para obtener la imagen
5. **Actualiza clases CSS:** Agrega `has-sprite` y `active` a la casilla actual
6. **Actualiza el texto:** Muestra la posición actual (+1 para mostrar 1-10 en lugar de 0-9)

---

### 6. **showCongratulationsModal()** - Líneas 86-90

**Propósito:** Muestra el modal de felicitaciones.

```javascript
function showCongratulationsModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('show');
}
```

**Funcionamiento:**
- Obtiene el elemento del modal
- Agrega la clase `show` que hace visible el modal (definido en CSS)

---

### 7. **closeModal()** - Líneas 92-96

**Propósito:** Oculta el modal.

```javascript
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('show');
}
```

---

### 8. **restartGame()** - Líneas 98-103

**Propósito:** Reinicia el juego a la posición inicial.

```javascript
function restartGame() {
    currentPosition = 0;
    updateDisplay();
    closeModal();
}
```

**Proceso:**
1. Resetea `currentPosition` a 0
2. Actualiza la visualización (sprite vuelve a la casilla 1)
3. Cierra el modal

---

### 9. **exitGame()** - Líneas 105-109

**Propósito:** Maneja la salida del juego.

```javascript
function exitGame() {
    // Por ahora no hace nada
    alert('¡Gracias por jugar!');
}
```

**Nota:** Por ahora solo muestra un mensaje de despedida.

---

### 10. **Inicialización** - Línea 137

```javascript
document.addEventListener('DOMContentLoaded', initGame);
```

**Propósito:** Ejecuta `initGame()` cuando el DOM está completamente cargado.

**Importante:** Garantiza que todos los elementos HTML existan antes de que JavaScript intente acceder a ellos.

---

## Flujo de Ejecución

### Secuencia de Inicio

1. **Usuario carga la página** → HTML se carga
2. **`DOMContentLoaded`** → Se dispara el evento
3. **`initGame()` se ejecuta**:
   - Crea las 10 casillas
   - Configura event listeners
   - Llama a `updateDisplay()`
4. **`updateDisplay()`** → Muestra el sprite en la posición 0

### Flujo de Juego

1. **Usuario presiona tecla/botón** → Event listener detecta acción
2. **Se llama a `moveLeft()` o `moveRight()`**
3. **Se actualiza `currentPosition`**
4. **Se llama a `updateDisplay()`**:
   - Limpia todas las casillas
   - Crea nuevo sprite con imagen correcta
   - Actualiza posición en texto
5. **Si llegó a posición 9** → Muestra modal de felicitaciones

---

## Características Técnicas

### Sistema de Frames

El juego implementa un sistema de frames donde cada casilla muestra un sprite diferente. Esto se logra mediante:

```javascript
sprite.src = spriteFrames[currentPosition];
```

**Ventajas:**
- Animación más fluida al mover el sprite
- Fácil personalización (solo cambiar los archivos PNG)
- Escalable (fácil agregar más frames)

### Event Listeners

El juego usa múltiples tipos de event listeners:

1. **Teclado:** `document.addEventListener('keydown', handleKeyPress)`
2. **Click en botones:** `btnLeft.addEventListener('click', moveLeft)`
3. **Click en modal:** Botones de reiniciar y salir

### Manipulación del DOM

El código manipula activamente el DOM:
- **Creación:** `document.createElement('div')`, `document.createElement('img')`
- **Modificación:** `cell.innerHTML = ''`, `cell.classList.add()`
- **Obtención:** `document.getElementById()`
- **Agregado:** `grid.appendChild(cell)`

---

## Consideraciones de Rendimiento

1. **Limpieza de celdas:** Se limpian todas las casillas en cada movimiento para evitar acumulación de elementos DOM
2. **Optimización de búsqueda:** Se usan IDs para acceso rápido a elementos
3. **Manejo de eventos:** Event listeners se configuran una sola vez en la inicialización
4. **Actualización selectiva:** Solo se actualiza la visualización cuando es necesario

---

## Extensibilidad

### Agregar más casillas

Para cambiar a 20 casillas:
```javascript
const gridSize = 20;
const spriteFrames = [
    'sprite_1.png',
    // ... hasta sprite_20.png
];
```

### Cambiar el sprite según la dirección

Modificar `updateDisplay()` para incluir orientación del sprite.

### Agregar animaciones

Implementar transiciones CSS o JavaScript entre casillas.

---

**Última actualización:** 2024
**Versión:** 1.0

