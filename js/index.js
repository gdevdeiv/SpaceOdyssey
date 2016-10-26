var temp;
var fps = 60;
var gameOver = false;
var ticks = 0;

var player;
var audio;
var stars = [];
var bullets = [];
var enemies = [];
var items = [];

var width = window.innerWidth;
var height = window.innerHeight - 20;
var margin = 100;

var bso;
var sounds = [];

var canvas;
var context;

$(document).ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    spawnPlayer();
    spawnStars();
    initAudio();
    initInput();

    $("#canvas").attr("width", width);
    $("#canvas").attr("height", height);

    console.log("%cLoaded. Running at " + fps + " FPS.", "font-weight:bold");

    temp = setTimeout(fLoop, (1 / fps) * 1000);
});

var fLoop = function() {

    clearCanvas();
    resizeCanvas();

    if (ticks % 140 === 0) {
        spawnEnemy();
    }

    updateStars();
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

    ticks++;

    clearTimeout(temp);
    temp = setTimeout(fLoop, (1 / fps) * 1000);
};
