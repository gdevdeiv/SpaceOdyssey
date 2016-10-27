Enemy2.prototype = new Enemy(animation);

function updateEnemies2() {
    for (var enemy in enemies) {
        enemies[enemy].tick();
    }
}

function spawnEnemy2() {
    var animation = new Animation();
    animation.addSprite(new Sprite("img/blue/enemy/1.png"));
    animation.addSprite(new Sprite("img/blue/enemy/2.png"));
    animation.addSprite(new Sprite("img/blue/enemy/3.png"));
    animation.addSprite(new Sprite("img/blue/enemy/4.png"));
    enemies.push(new Enemy(animation));
}