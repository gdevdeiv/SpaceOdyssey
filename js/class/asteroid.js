var Asteroid = function(x, y, speed, angle, size, directionx, directiony) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
    this.img = new Image();
    this.img.src = "img/aestroid/aestroid_brown.png";
    this.width = player.width * 2 / size;
    this.height = player.height * 2 / size;
    this.directionx = directionx;
    this.directiony = directiony;
    this.randomx = Math.random() * 2 + 1;
    this.randomy = Math.random() * 2 + 1;
};

Asteroid.prototype.tick = function() {
    this.update();
    this.render();
};

Asteroid.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, this.width, this.height, this.angle);
};

Asteroid.prototype.update = function() {
    this.angle += 0.05;
    switch (this.directionx) {
        case "right":
            this.x += this.speed * this.randomx;
            break;
        case "left":
            this.x -= this.speed * this.randomx;
            break;
    }
    switch (this.directiony) {
        case "up":
            this.y -= this.speed * this.randomy;
            break;
        case "down":
            this.y += this.speed * this.randomy;
            break;
    }
    if (this.x < 0) { this.directionx = "right"; }
    if (this.x > window.innerWidth) { this.directionx = "left"; }
    if (this.y < 0) { this.directiony = "down"; }
    if (this.y > window.innerHeight) { this.directiony = "up"; }
    if (!player.inmune) {
        if (this.x + this.width / 2 > player.x - player.width / 2 &&
            this.x - this.width / 2 < player.x - player.width / 2 &&
            this.y + this.height / 2 > player.y - player.height / 2 &&
            this.y - this.height / 2 < player.y + player.height / 2
        ) {
            player.removeEnergy(1);
            audio.playBoom();
            player.inmune = true;
            clearTimeout(counterInmunity);
            counterInmunity = setTimeout(function() {
                player.inmune = false;
            }, player.inmuneTime);
            this.split();
        }
    }
    for (var enemy in enemies) {
        if (this.x + this.width / 2 > enemies[enemy].x - enemies[enemy].width / 2 &&
            this.x - this.width / 2 < enemies[enemy].x - enemies[enemy].width / 2 &&
            this.y + this.height / 2 > enemies[enemy].y - enemies[enemy].height / 2 &&
            this.y - this.height / 2 < enemies[enemy].y + enemies[enemy].height / 2
        ) {
            enemies[enemy].removeHealth(1);
            audio.playBoom();
            this.split();
        }
    }
};

Asteroid.prototype.split = function() {
    if (this.size < 4) {
        asteroids.push(new Asteroid(this.x, this.y, this.speed, 0, this.size + 1, "right", "up"));
        asteroids.push(new Asteroid(this.x, this.y, this.speed, 0, this.size + 1, "left", "down"));
    }
    this.destroyAsteroid(this);
};

Asteroid.prototype.destroyAsteroid = function(asteroid) {
    asteroids.splice(asteroids.indexOf(asteroid), 1);
};

function updateAsteroids() {
    for (var asteroid in asteroids) {
        asteroids[asteroid].tick();
    }
}

function spawnAsteroid(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnAsteroid, i * 2500);
    }
}

var fSpawnAsteroid = function() {
    asteroids.push(new Asteroid(10, 10, 1, 0, 1, "right", "down"));
};
