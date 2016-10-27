var Stars = function() {
    this.layers = [];
    this.density = 128;
    this.radius = 1.5;
    this.speedX = 0;
    this.speedY = 3;
};

Stars.prototype.init = function() {
    for (var i = 0; i < 4; i++) {
        var stars = [];
        for (var j = 0; j < this.density * i; j++) {
            stars.push({
                x: getRandomInt(0, width),
                y: getRandomInt(0, height),
                radius: Math.round(this.radius / i * 100) / 100,
                speedX: Math.round(this.speedX / i * 100) / 100,
                speedY: Math.round(this.speedY / i * 100) / 100
            });
        }
        this.layers.push(stars);
    }
};

Stars.prototype.tick = function() {
    this.update();
    this.render();
};

Stars.prototype.update = function() {
    for (var layer in this.layers) {
        for (var stars in this.layers[layer]) {
            var star = this.layers[layer][stars];
            if (this.inBounds(star.x, star.y)) {
                star.x += star.speedX + (player.movementX * (star.speedX / 2));
                star.y += star.speedY + (player.movementY * (star.speedY / 2));
            } else {
                star.x = getRandomInt(0, width);
                star.y = 1;
            }
        }
    }
};

Stars.prototype.render = function() {
    context.fillStyle = "#FFFFFF";
    for (var layer in this.layers) {
        for (var stars in this.layers[layer]) {
            var star = this.layers[layer][stars];
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
            context.fill();
        }
    }
};

Stars.prototype.inBounds = function(x, y) {
    return ((x > 0 && x < width) && (y > 0 && y < height));
};