var Star = function(x, y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.img = new Image();
    this.img.src = "img/background.png";
};

Star.prototype.tick = function() {
    this.update();
    this.render();
};

Star.prototype.update = function() {
    this.y += this.step;
    if (player.movementX !== 0) {
        this.x -= player.movementX * (this.step * 2);
    }
    if (player.movementY !== 0) {
        this.y -= player.movementY * (this.step * 2);
    }
};

Star.prototype.render = function() {
    context.drawImage(this.img, this.x, this.y);
};

function updateStars() {
    for (var star in stars) {
        stars[star].tick();
    }
}

function spawnStars() {
    stars.push(new Star(0, 0, 0.35));
    stars.push(new Star(0, 100, 0.2));
    stars.push(new Star(0, -200, 0.1));
    stars.push(new Star(800, 0, 0.35));
    stars.push(new Star(800, 100, 0.2));
    stars.push(new Star(800, -200, 0.1));
}