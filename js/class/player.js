var Player = function(animation) {
    this.width = width / 20;
    this.height = width / 20;
    this.x = (width / 2) - (this.width / 2);
    this.y = height / 1.5;
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
    this.sprite = 1;
    this.maxSprites = 5;
    this.energy = 10;
    this.maxEnergy = 10;
    this.shootSpeed = 10;
    this.inmune = false;
    this.inmuneTime = 1000;
    this.weapon = new WeaponBasic()
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
    if (this.x < (this.width / 2)) { this.x = (this.width / 2); }
    if (this.x > width - (this.width / 2)) { this.x = width - (this.width / 2); }
    if (this.y < (this.height / 2)) { this.y = (this.height / 2); }
    if (this.y > height - (this.height / 2)) { this.y = height - (this.height / 2); }
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
    if (this.inmune) {
        context.strokeStyle = 'white';
        context.beginPath();
            context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, true);
            context.stroke();
        context.closePath();
    }
};

Player.prototype.shoot = function() {
    if (gameOver) {
        return;
    }
    this.weapon.shoot();
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

function spawnPlayer() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/blue/player/1/1.png"));
    animation.addSprite(new Sprite("img/blue/player/1/2.png"));
    animation.addSprite(new Sprite("img/blue/player/1/3.png"));
    animation.addSprite(new Sprite("img/blue/player/1/4.png"));
    animation.addSprite(new Sprite("img/blue/player/1/5.png"));
    player = new Player(animation);
}
