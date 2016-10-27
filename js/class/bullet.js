var Bullet = function(x, y, speed, angle, type) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.type = type; //0-player,1-bullet,2-bullet2,3-bullet3...
    this.img = new Image();
    this.img.src = (this.type == 0) ? "img/blue/bullet.png" : "img/red/bullet.png";
    this.width = player.width/3;
    this.height = player.height/3;
    //define el ancho y el alto de la imagen de la bala para ajustar mejor las hitbox
};



Bullet.prototype.tick = function() {
    this.update();
    this.render();
};

Bullet.prototype.update = function() {
    var positionInArray = bullets.indexOf(this)
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        bullets.splice(positionInArray, 1);
        return;
    }
    if(this.type <= 2){
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    if (this.type == 0) {
        for (var enemy in enemies) {
            if (this.x + this.width/2 > enemies[enemy].x - enemies[enemy].width/2 &&
                this.x -this.width/2< enemies[enemy].x + enemies[enemy].width/2 &&
                this.y + this.height/2 > enemies[enemy].y-enemies[enemy].height/2 &&
                this.y -this.height/2< enemies[enemy].y + enemies[enemy].height/2
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
                bullets.splice(positionInArray, 1);
                break;
            }
        }
    } 
    if(this.type != 0) {
        if (gameOver) {
            return;
        }
        if (this.x + this.width/2 > player.x -player.width/2 &&
            this.x -this.width/2 < player.x + player.width/2 &&
            this.y + this.height/2 > player.y - player.height/2 &&
            this.y -this.height/2 < player.y + player.height/2
        ) {
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            bullets.splice(positionInArray, 1);
        }
    }
};

Bullet.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, this.width, this.height, this.angle);
};

function updateBullets() {
    for (var bullet in bullets) {
        bullets[bullet].tick();
    }
}
