var Enemy = function(x, y, speed, angle, animation) {
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
}; 

Enemy.prototype.tick = function() {
    this.update();
    this.render();
};

Enemy.prototype.update = function() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        enemies.splice(enemies.indexOf(this), 1);
    }
    if (player !== undefined) {
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

Enemy.prototype.shootLaser = function() {
    bullets.push(new BulletLaser(this));
};

function updateEnemies() {
    for (var enemy in enemies) {
        enemies[enemy].tick();
    }
}

function clearEnemies() {
    enemies = [];
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

function spawnEnemyWave(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnEnemyWave, i * 2250);
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

function spawnEnemyLaser(n) {
    for (var i = 0; i < n; i++) {
        setTimeout(fSpawnEnemyLaser, i * 1250);
    }
}

var fSpawnEnemyLaser = function() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    var spawnPosition = Math.random();
    if (spawnPosition < 0.25) {             //case up
        enemies.push(new EnemyLaser(height / 20, height, 5, 0, "up", animation));
    }else if(spawnPosition < 0.5) {         //case down
        enemies.push(new EnemyLaser(height / 20, 0, 5, 0, "down", animation));
    }else if(spawnPosition < 0.75) {        //case right
        enemies.push(new EnemyLaser(height / 20, height / 20, 5, Math.PI/2, "right", animation));
    }else{                                  //case left
        enemies.push(new EnemyLaser(width, height/20, 5, Math.PI/2, "left", animation));
    }
};