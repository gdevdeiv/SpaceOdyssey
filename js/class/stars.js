var Stars = function() {
    this.layers = [];
    this.density = 96;
    this.radius = 3;
    this.speedX = 0;
    this.speedY = 1.5;
};

Stars.prototype.init = function() {
    for (var i = 0; i < 4; i++) {
        var stars = [];
        for (var j = 0; j < this.density * i; j++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: this.radius / i,
                speedX: this.speedX / i,
                speedY: this.speedY / i
            });
        }
        this.layers.push(stars);
    }
};

Stars.prototype.tick = function() {
    for (var layer in this.layers) {
        for (var stars in this.layers[layer]) {
            var star = this.layers[layer][stars];
            if (this.inBounds(star.x, star.y)) {
                /*star.x += star.speedX + (player.movementX * (star.speedX / 2));
                star.y += star.speedY + (player.movementY * (star.speedY / 2));*/
                star.x += star.speedX;
                star.y += star.speedY;
            } else {
                star.x = Math.random() * width;
                star.y = 1;
            }
            context.drawImage(dot, star.x, star.y, star.radius, star.radius);
        }
    }
};

Stars.prototype.inBounds = function(x, y) {
    return ((x > 0 && x < width) && (y > 0 && y < height));
};