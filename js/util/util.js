var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;
var dot = new Image();
dot.src = "img/dot2.png";

Math.lerp = function (a, b, n) {
	n = n < 0 ? 0 : n;
	n = n > 1 ? 1 : n;
	return a + (b - a) * n;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRotatedImage(img, x, y, width, height, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(angle);
	context.drawImage(img, -(width / 2), -(height / 2), width, height);
	context.restore();
}

function clearCanvas() {
	context.clearRect(0, 0, width, height);
}

function resizeCanvas() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	bgCanvas.width = width;
	bgCanvas.height = height;
}

function checkRound() {
	if (enemies.length > 0) {
		return;
	}
	nextRound();
}

function nextRound() {
	doCheckRound = false;
	clearTimeout(counterRound);
	conunterRound = setTimeout(fCheckRoundAgain, 5000);
	round++;
	$("#round").html("<h1>Round " + round + "</h1>").fadeIn("slow", function() {
		setTimeout(function() {
			$("#round").fadeOut("slow", function() {
				/*for (var level in config.levels) {
					for (var r in config.levels[level]) {
						if (r != round - 1) { continue; }
						if (config.levels[level][r].asteroids > 0) {
							spawnAsteroid(config.levels[level][r].asteroids);
						}
						if (config.levels[level][r].enemies.enemyFollower > 0) {
							spawnEnemyFollower(config.levels[level][r].enemies.enemyFollower);
						}
						if (config.levels[level][r].enemies.enemyParabolic > 0) {
							spawnEnemyParabolic(config.levels[level][r].enemies.enemyParabolic);
						}
						if (config.levels[level][r].enemies.enemyWave > 0) {
							spawnEnemyWave(config.levels[level][r].enemies.enemyWave);
						}
					}
				}*/
				spawnEnemyLaser(6);
			});
		}, 2000);
	});
}

var fCheckRoundAgain = function() {
	doCheckRound = true;
};