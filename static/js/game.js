const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Inicializar sistemas
const TILE_SIZE = 64; // Pixeles por bloque/tile
const world = new World(100, 100, TILE_SIZE); // Mundo de 100x100 tiles
const player = new Player(200, 200, { hp: 100, mp: 50, sp: 80, str: 75 }); // Humano

// Cámara
const camera = {
    x: 0, y: 0,
    width: canvas.width, height: canvas.height
};

// Controles
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === 'e') {
        player.inventory.toggle();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Sistema de Día y Noche
let gameTime = 8 * 60; // Inicia a las 8:00 AM (en minutos)
let timeSpeed = 1; // Velocidad del tiempo

function updateTime() {
    gameTime += timeSpeed;
    if (gameTime >= 24 * 60) gameTime = 0;
    
    let hours = Math.floor(gameTime / 60);
    let minutes = Math.floor(gameTime % 60);
    document.getElementById('clock').innerText = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function getAmbientLight() {
    let hours = gameTime / 60;
    if (hours >= 6 && hours < 18) return 'rgba(0,0,0,0)'; // Día claro
    if (hours >= 18 && hours < 20) return 'rgba(0,0,20,0.4)'; // Atardecer
    if (hours >= 20 || hours < 5) return 'rgba(0,0,30,0.8)'; // Noche oscura
    return 'rgba(0,0,20,0.4)'; // Amanecer
}

// Actualizar HUD
function updateHUD() {
    document.getElementById('hp-bar').style.width = `${(player.hp / player.maxHp) * 100}%`;
    document.getElementById('mp-bar').style.width = `${(player.mp / player.maxMp) * 100}%`;
    document.getElementById('sp-bar').style.width = `${(player.sp / player.maxSp) * 100}%`;
}

// Bucle principal del juego
let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Lógica
    player.update(keys, world);
    updateTime();
    updateHUD();

    // Actualizar cámara para seguir al jugador
    camera.x = player.x + player.width / 2 - canvas.width / 2;
    camera.y = player.y + player.height / 2 - canvas.height / 2;
    camera.width = canvas.width;
    camera.height = canvas.height;

    // Renderizado
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.draw(ctx, camera);
    player.draw(ctx, camera);

    // Renderizar Filtro de Noche
    ctx.fillStyle = getAmbientLight();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(gameLoop);
}

// Iniciar
requestAnimationFrame(gameLoop);