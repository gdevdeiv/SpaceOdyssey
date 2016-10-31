var Enemy = function(x, y, speed, angle, angularSpeed, animation) {
    this.x = x;
    this.y = y;
    this.speedX = Math.ceil(Math.random() * 3);
    this.speedY = Math.ceil(Math.random() * 3);
    this.speed = speed;
    this.angle = angle;
    this.animation = animation;
    this.width = width / 20;
    this.height = width / 20;
    this.shootSpeed = 10;
    this.angularSpeed = angularSpeed;
}; 

Enemy.prototype.tick = function() {
    this.update();
    this.render();
};

Enemy.prototype.update = function() {
   if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        enemies.splice(enemies.indexOf(this), 1);
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
            enemies.splice(enemies.indexOf(this), 1);
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
        bullets.push(new BulletRadial(this.x, this.y, this.shootSpeed * 0.4, i * (Math.PI / 8)));
    }
};

Enemy.prototype.shootFollower = function() {
    bullets.push(new BulletFollower(this.x, this.y, this.shootSpeed * 0.3, this.angle));
    bullets[bullets.length - 1].width *= 4;
    bullets[bullets.length - 1].height *= 4;
};

function updateEnemies() {
    for (var enemy in enemies) {
        enemies[enemy].tick();
    }
}

function spawnEnemyFollower(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnEnemyFollower, i * 1750);
    }
}

function spawnEnemyParabolic(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnEnemyParabolic, i * 1250);
    }
}

var fSpawnEnemyFollower = function() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    enemies.push(new EnemyFollower(300, 300, 3, 10, animation));
};

var fSpawnEnemyParabolic = function() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    enemies.push(new EnemyParabolic(20, 20, 5, Math.PI / 6, 0.02, animation));
};

function spawnEnemyWave(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnEnemyWave, i * 1250);
    }
}

var fSpawnEnemyWave = function() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    enemies.push(new EnemyWave(20, 20, 5, 0, 0.05, animation));
};