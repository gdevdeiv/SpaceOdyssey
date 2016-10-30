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
   if(this.posx < 0 || this.posx > width || this.posy < 0 || this.posy > height){
        var positionInArray = enemies.indexOf(this);
        enemies.splice(this, 1);
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

function spawnEnemyFollower() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/red/enemy/1.png"));
    animation.addSprite(new Sprite("img/red/enemy/2.png"));
    animation.addSprite(new Sprite("img/red/enemy/3.png"));
    animation.addSprite(new Sprite("img/red/enemy/4.png"));
    animation.addSprite(new Sprite("img/red/enemy/5.png"));
    animation.addSprite(new Sprite("img/red/enemy/6.png"));
    animation.addSprite(new Sprite("img/red/enemy/7.png"));
    animation.addSprite(new Sprite("img/red/enemy/8.png"));
    enemies.push(new EnemyFollower(animation));
}
