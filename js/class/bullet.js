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
            if (this.x + 128/2 > enemies[enemy].x - enemies[enemy].width/2 &&
                this.x -128/2< enemies[enemy].x + enemies[enemy].width/2 &&
                this.y + 128/2 > enemies[enemy].y-enemies[enemy].height/2 &&
                this.y -128/2< enemies[enemy].y + enemies[enemy].height/2
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
        if (this.x + 128/2 > player.x -player.width/2 &&
            this.x -128/2 < player.x + player.width/2 &&
            this.y + 128/2 > player.y - player.height/2 &&
            this.y -128/2 < player.y + player.height/2
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
