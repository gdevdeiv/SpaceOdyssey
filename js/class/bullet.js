var Bullet = function(x, y, speed, angle, isFriendly) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.isFriendly = isFriendly;
    this.img = new Image();
    this.img.src = (this.isFriendly) ? "img/blue/bullet.png" : "img/red/bullet.png";
    //define el ancho y el alto de la imagen de la bala para ajustar mejor las hitbox
};



Bullet.prototype.tick = function() {
    this.update();
    this.render();
};

Bullet.prototype.update = function() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        bullets.splice(this, 1);
        return;
    }
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.isFriendly) {
        for (var enemy in enemies) {
            if (this.x + 128 > enemies[enemy].x &&
                this.x < enemies[enemy].x + enemies[enemy].width &&
                this.y + 128 > enemies[enemy].y &&
                this.y < enemies[enemy].y + enemies[enemy].height
            ) {
                var rand = Math.random();
                if (rand > 0.95) {
                    items.push(new Item(enemies[enemy].x, enemies[enemy].y, "energy"));
                } else if (rand > 0.8) {
                    items.push(new Item(enemies[enemy].x, enemies[enemy].y, "ammo"));
                }
                audio.playBoom();
                player.addScore(50);
                enemies.splice(enemy, 1);
                bullets.splice(this, 1);
                break;
            }
        }
    } else {
        if (gameOver) {
            return;
        }
        if (this.x + 128 > player.x &&
            this.x < player.x + player.width &&
            this.y + 128 > player.y &&
            this.y < player.y + player.height
        ) {
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            bullets.splice(this, 1);
        }
    }
};

Bullet.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, 128, 128, this.angle);
};

function updateBullets() {
    for (var bullet in bullets) {
        bullets[bullet].tick();
    }
}
