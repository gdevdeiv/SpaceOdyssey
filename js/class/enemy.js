var Enemy = function(animation) {
    this.x = width - (Math.random() * 350);
    this.y = height - (Math.random() * height);
    this.speedX = Math.ceil(Math.random() * 3);
    this.speedY = Math.ceil(Math.random() * 3);
    this.angle = 0;
    this.animation = animation;
    this.width = width/20;
    this.height = width/20;
    this.shootSpeed = 10;

    this.tick = function(){
        this.update();
        this.render();
    };
    this.render = function() {
        drawRotatedImage(this.animation.getActualSprite().getImg(), this.x, this.y, this.width, this.height, this.angle+Math.PI);
    };
}; 

Enemy.prototype.update = function() {
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
        this.shoot();
        this.shoot2();
    }
};

Enemy.prototype.shoot = function() {
    bullets.push(new Bullet(this.x + 100, this.y + 10, this.shootSpeed, this.angle, 1));
};

//balas radiales
Enemy.prototype.shoot2 = function() {
    for (var i=0;i<16;i++){
        angle = i*Math.PI/8;
        bullets.push(new Bullet(this.x, this.y, this.shootSpeed*0.5, angle, 2));
    }
}

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
