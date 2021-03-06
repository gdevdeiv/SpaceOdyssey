var temp;
var fps = 60;
var gameOver = false;
var ticks = 0;
var counterInmunity = "";
var counterLaser = "";

var round = 0;
var doCheckRound = true;
var counterRound = "";

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
    resizeCanvas();
    stars.tick();
    if (ticks % 100 === 0) {
        var rand = Math.random();
        if (rand > 0.4) {
            spawnEnemyWave(1);
        } else {
            spawnEnemyParabolic(1);
        }
    }
    updateEnemies();
    ticks++;
    clearTimeout(temp);
    temp = setTimeout(fMenuLoop, (1 / fps) * 1000);
};

function start() {
    clearEnemies();
    spawnPlayer();
    audio = new GameAudio();
    audio.init();
    input = new GameInput();
    input.init();
    console.log("%cLoaded. Running at " + fps + " FPS.", "font-weight:bold");
    ticks = 0;
    temp = setTimeout(fLoop, (1 / fps) * 1000);
}

var fLoop = function() {
    resizeCanvas();
    stars.tick();
    if (doCheckRound){
        checkRound();
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
        context.fillStyle = 'rgba(23, 23, 23, 0.5)';
        context.fillRect(0, 0, width, height);
        menu.showGameOver();
    }

    ticks++;

    clearTimeout(temp);
    temp = setTimeout(fLoop, (1 / fps) * 1000);
};
