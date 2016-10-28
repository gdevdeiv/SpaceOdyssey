var temp;
var fps = 60;
var gameOver = false;
var ticks = 0;

var player;
var stars = new Stars();
var audio = new GameAudio();
var input = new GameInput();
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

    spawnPlayer();
    spawnAsteroid();
    stars.init();
    audio.init();
    input.init();

    console.log("%cLoaded. Running at " + fps + " FPS.", "font-weight:bold");

    temp = setTimeout(fLoop, (1 / fps) * 1000);
});

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
    updateHud();
    if (gameOver) {
        renderGameOverScreen();
    }

    updateAsteroids();

    ticks++;

    clearTimeout(temp);
    temp = setTimeout(fLoop, (1 / fps) * 1000);
};
