var temp;
var fps = 60;
var gameOver = false;
var ticks = 0;
var counterInmunity = ""

var player;
var stars = new Stars();
var audio;
var input;
var menu = new GameMenu();
var bullets = [];
var enemies = [];
var items = [];
var asteroids = [];

var width = window.innerWidth;
var height = window.innerHeight;
var margin = 100;

var bso;
var sounds = [];

var canvas;
var context;
var bgCanvas;
var bgContext;

$(document).ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    bgCanvas = document.getElementById("bgCanvas");
    bgContext = bgCanvas.getContext("2d");
    stars.init();
    menu.init();
    temp = setTimeout(fMenuLoop, (1 / fps) * 1000);
});

var fMenuLoop = function() {
    if (ticks % 4 === 0) {
        resizeCanvas();
        stars.tick();
    } else {
        clearCanvas();
    }
    clearTimeout(temp);
    temp = setTimeout(fMenuLoop, (1 / fps) * 1000);
};

function start() {
    spawnPlayer();
    spawnAsteroid();
    audio = new GameAudio()
    audio.init();
    input = new GameInput()
    input.init();
    console.log("%cLoaded. Running at " + fps + " FPS.", "font-weight:bold");
    temp = setTimeout(fLoop, (1 / fps) * 1000);
}

var fLoop = function() {
    if (ticks % 4 === 0) {
        resizeCanvas();
        stars.tick();
    } else {
        clearCanvas();
    }

    if (ticks % 140 === 0) {
        spawnEnemy();
    }

    updateBullets();
    updateEnemies();
    if (!gameOver) {
        player.tick();
    }
    updateItems();
    updateAsteroids();

    updateHud();
    if (gameOver) {
        renderGameOverScreen();
    }

    ticks++;

    clearTimeout(temp);
    temp = setTimeout(fLoop, (1 / fps) * 1000);
};
