var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;

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
