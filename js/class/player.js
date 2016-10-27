var Player = function(animation) {
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedMultiplier = 1 / 4;
    this.movementX = 0;
    this.movementY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.angle = 0;
    this.score = 0;
    this.animation = animation;
    this.width = width/20;
    this.height = width/20;
    this.sprite = 1;
    this.maxSprites = 5;
    this.energy = 10;
    this.maxEnergy = 10;
    this.ammo = 40;
    this.maxAmmo = 40;
    this.shootSpeed = 10;
};

Player.prototype.tick = function() {
    this.update();
    this.render();
};

Player.prototype.update = function() {
    // Movement smoothing.
    if (this.movementX === 0) {
        this.speedX = Math.lerp(this.speedX, 0, 0.1);
    } else {
        this.speedX += this.movementX * this.speedMultiplier;
    }
    if (this.movementY === 0) {
        this.speedY = Math.lerp(this.speedY, 0, 0.1);
    } else {
        this.speedY += this.movementY * this.speedMultiplier;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    // Limiting to canvas width and height.
    if (this.x < 0) { this.x = 0; }
    if (this.x > (width - this.width)) { this.x = (width - this.width); }
    if (this.y < 0) { this.y = 0; }
    if (this.y > (height - this.height)) { this.y = (height - this.height); }
    // Sprite update.
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
    // Get angle to cursor.
    var _dx = this.mouseX - this.x;
    var _dy = this.mouseY - this.y;
    this.angle = Math.atan2(_dy, _dx);
};

Player.prototype.render = function() {
    drawRotatedImage(this.animation.getActualSprite().getImg(), this.x, this.y, this.width, this.height, this.angle);
};

Player.prototype.shoot = function() {
    if (this.removeAmmo(1)) {
        bullets.push(new Bullet(this.x+75*Math.cos(this.angle) , this.y+75*Math.sin(this.angle) , this.shootSpeed, this.angle, 0));
    }
};

Player.prototype.getScore = function() {
    return this.score;
};

Player.prototype.addScore = function(n) {
    this.score += n;
};

Player.prototype.removeScore = function(n) {
    this.score -= n;
};

Player.prototype.getEnergy = function() {
    return this.energy;
};

Player.prototype.getMaxEnergy = function() {
    return this.maxEnergy;
};

Player.prototype.addEnergy = function(n) {
    if (this.energy + n > this.maxEnergy) {
        this.energy = this.maxEnergy;
        return false;
    }
    this.energy += n;
    return true;
};

Player.prototype.removeEnergy = function(n) {
    if (this.energy - n <= 0) {
        this.energy = 0;
        gameOver = true;
        return false;
    }
    this.energy -= n;
    return true;
};

Player.prototype.getAmmo = function() {
    return this.ammo;
};

Player.prototype.getMaxAmmo = function() {
    return this.maxAmmo;
};

Player.prototype.addAmmo = function(n) {
    if (this.ammo + n > this.maxAmmo) {
        this.ammo = this.maxAmmo;
        return false;
    }
    this.ammo += n;
    return true;
};

Player.prototype.removeAmmo = function(n) {
    if (this.ammo - n < 0) {
        this.ammo = 0;
        return false;
    }
    this.ammo -= n;
    return true;
};

function updatePlayers() {
    // TODO: More players.
    /*for (var player in players) {
        players[player].tick();
    }*/
}

function spawnPlayer() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/blue/player/1/1.png"));
    animation.addSprite(new Sprite("img/blue/player/1/2.png"));
    animation.addSprite(new Sprite("img/blue/player/1/3.png"));
    animation.addSprite(new Sprite("img/blue/player/1/4.png"));
    animation.addSprite(new Sprite("img/blue/player/1/5.png"));
    player = new Player(animation);
}
