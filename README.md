# Juego de Grilla 1x10

Un juego simple donde mueves un sprite por una grilla de 10 casillas usando las teclas de flecha o botones.

## Características

- Grilla de 1x10 casillas con fondo de imagen (tiles)
- Background personalizado con imagen PNG para toda la pantalla
- Background del contenedor del juego (container-bg.png) con elementos sobre él
- Container semi-transparente con efecto blur para dejar ver el background
- Sistema de sprites por frames (10 sprites diferentes: sprite_1.png a sprite_10.png)
- El sprite cambia automáticamente al moverse por cada casilla
- Movimiento fluido entre casillas
- Controles con teclas de flecha (← →) y botones en pantalla
- Modal de felicitaciones al completar el juego
- Botones para reiniciar o salir del juego
- Botones de control con imágenes personalizadas (mitad del tamaño original)
- Sin overlays de color, solo las imágenes limpias
- Interfaz moderna y responsive

## Configuración inicial

1. Genera las imágenes necesarias abriendo en tu navegador:
   - `create-tile.html` - Generará el archivo `tile.png` (fondo de las casillas)
   - `create-background.html` - Generará el archivo `background.png` (fondo de toda la pantalla)
   - `create-container-bg.html` - Generará el archivo `container-bg.png` (fondo del contenedor del juego)
   
2. Para los sprites, necesitas **10 imágenes** con los nombres:
   - `sprite_1.png` (casilla 1)
   - `sprite_2.png` (casilla 2)
   - `sprite_3.png` (casilla 3)
   - `sprite_4.png` (casilla 4)
   - `sprite_5.png` (casilla 5)
   - `sprite_6.png` (casilla 6)
   - `sprite_7.png` (casilla 7)
   - `sprite_8.png` (casilla 8)
   - `sprite_9.png` (casilla 9)
   - `sprite_10.png` (casilla 10)
   
3. Para los botones de control, necesitas **2 imágenes**:
   - `btn-left.png` - Imagen del botón de flecha izquierda
   - `btn-right.png` - Imagen del botón de flecha derecha

4. Coloca todos los archivos en la carpeta del proyecto junto a `index.html`:
   - Los 10 sprites (`sprite_1.png` a `sprite_10.png`)
   - `tile.png`
   - `background.png`
   - `container-bg.png`
   - `btn-left.png`
   - `btn-right.png`

5. Opcionalmente, puedes reemplazar estas imágenes con tus propias imágenes personalizadas

## Cómo jugar

1. Abre el archivo `index.html` en tu navegador
2. Mueve el sprite usando:
   - Teclas de flecha **← →** en tu teclado
   - Botones **Izquierda** y **Derecha** en la pantalla
3. El movimiento es casilla por casilla de forma fluida
4. Cuando llegues a la última casilla (posición 10), aparecerá un modal de felicitaciones
5. Elige:
   - **De Nuevo**: Reinicia el juego en la posición inicial
   - **Salir**: Muestra un mensaje de despedida

## Estructura del proyecto

- `index.html` - Estructura HTML del juego
- `styles.css` - Estilos y diseño visual
- `game.js` - Lógica del juego y manejo de eventos
- `create-tile.html` - Generador del tile.png
- `create-background.html` - Generador del background.png
- `create-container-bg.html` - Generador del container-bg.png
- `sprite_1.png` a `sprite_10.png` - Sprites del personaje para cada casilla
- `tile.png` - Imagen de fondo para las casillas (se genera con create-tile.html)
- `background.png` - Imagen de fondo para toda la pantalla (se genera con create-background.html)
- `container-bg.png` - Imagen de fondo para el contenedor del juego (se genera con create-container-bg.html)
- `btn-left.png` - Imagen del botón de flecha izquierda
- `btn-right.png` - Imagen del botón de flecha derecha

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Requisitos

Solo necesitas un navegador web moderno. No requiere instalación adicional.

