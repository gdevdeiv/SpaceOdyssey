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
            if (this.inBoundsX(star.x)) {
                if (player !== undefined) {
                    star.x += star.speedX - (player.movementX * 0.4);
                }
                star.x += star.speedX;
            } else {
                if (star.x <= 0) {
                    star.x = width - 1;
                }
                if (star.x >= width) {
                    star.x = 1;
                }
            }
            if (this.inBoundsY(star.y)) {
                if (player !== undefined) {
                    star.y += star.speedY - (player.movementY * 0.4);
                }
                star.y += star.speedY;
            } else {
                if (star.y <= 0) {
                    star.y = height - 1;
                }
                if (star.y >= height) {
                    star.y = 1;
                }
            }
            context.drawImage(dot, star.x, star.y, star.radius, star.radius);
        }
    }
};

Stars.prototype.inBoundsX = function(x) {
    return (x > 0 && x < width);
};

Stars.prototype.inBoundsY = function(y) {
    return (y > 0 && y < height);
};

Stars.prototype.resize = function() {
    this.layers = [];
    this.init();
};