var Enemy = function(animation) {
    this.x = width - (Math.random() * 350);
    this.y = height - (Math.random() * height);
    this.speedX = Math.ceil(Math.random() * 3);
    this.speedY = Math.ceil(Math.random() * 3);
    this.angle = 0;
    this.animation = animation;
    this.width = width / 20;
    this.height = width / 20;
    this.shootSpeed = 10;
}; 

Enemy.prototype.tick = function() {
    this.update();
    this.render();
};

Enemy.prototype.update = function() {
    var positionInArray = enemies.indexOf(this);
    if (this.x < -this.width) {
        enemies.splice(this, 1);
        return;
    }
    this.x -= this.speedX;
    if (this.x > player.x) {
        if (this.y > player.y) {
            this.y -= this.speedY + ((Math.random() * 4) - 2);
        } else {
            this.y += this.speedY + ((Math.random() * 4) - 2);
        }
    } else {
        this.y += (Math.random() * 8) - 4;
    }
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
    var _dx = player.x - this.x;
    var _dy = player.y - this.y;
    this.angle = Math.atan2(_dy, _dx);
    if (ticks % (Math.round(Math.random() * 50) + 150) === 0) {
        this.shootSimple();
    }
    if (ticks % (Math.round(Math.random() * 50) + 200) === 0) {
        this.shootRadial();
    }
    if (ticks % (Math.round(Math.random() * 50) + 300) === 0) {
        this.shootFollower();
    }
    if (!player.inmune) {
        if (this.x + this.width / 2 > player.x - player.width / 2 &&
            this.x - this.width / 2 < player.x + player.width / 2 &&
            this.y + this.height / 2 > player.y - player.height / 2 &&
            this.y - this.height / 2 < player.y + player.height / 2
        ) {
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            enemies.splice(positionInArray, 1);
            player.inmune = true;
            clearTimeout(counterInmunity);
            counterInmunity = setTimeout(function() {
                player.inmune = false;
            }, player.inmuneTime);
        }
    }
};

Enemy.prototype.render = function() {
    drawRotatedImage(this.animation.getActualSprite().getImg(), this.x, this.y, this.width, this.height, this.angle + Math.PI);
};

Enemy.prototype.shootSimple = function() {
    bullets.push(new BulletSimple(this.x, this.y, this.shootSpeed, this.angle));
};

Enemy.prototype.shootRadial = function() {
    for (var i = 0; i < 16; i++) {
        bullets.push(new BulletRadial(this.x, this.y, this.shootSpeed * 0.6, i * (Math.PI / 8)));
    }
};

Enemy.prototype.shootFollower = function() {
    bullets.push(new BulletFollower(this.x, this.y, this.shootSpeed * 0.6, this.angle));
    bullets[bullets.length - 1].width *= 4;
    bullets[bullets.length - 1].height *= 4;
};

function updateEnemies() {
    for (var enemy in enemies) {
        enemies[enemy].tick();
    }
}

function spawnEnemy() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    enemies.push(new Enemy(animation));
}
