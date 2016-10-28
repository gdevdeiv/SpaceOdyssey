var Bullet = function(x, y, speed, angle, type) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.type = type; // 0-player,1-bullet,2-bullet2,3-bullet3...
    this.img = new Image();
    this.img.src = (this.type === 0) ? "img/blue/bullet.png" : "img/red/bullet.png";
    this.width = player.width / 3;
    this.height = player.height / 3;
    // define el ancho y el alto de la imagen de la bala para ajustar mejor las hitbox
};

Bullet.prototype.tick = function() {
    this.update();
    this.render();
};

Bullet.prototype.update = function() {
    var positionInArray = bullets.indexOf(this);
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        bullets.splice(positionInArray, 1);
        return;
    }
    if (this.type <= 2) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
    if (this.type === 3) {
        var incrementx = player.x - this.x;
        var incrementy = player.y - this.y;
        this.angle = Math.atan(incrementy / incrementx);
        if ((incrementx < 0 && incrementy > 0) || (incrementx < 0 && incrementy < 0)) { // segundo y tercer cuadrante
            this.angle -= Math.PI;
        }
        if (incrementx > 0 && incrementy < 0) { // cuarto cuadrante
            this.angle -= 2 * Math.PI;
        }
        this.y += this.speed * Math.sin(this.angle);
        this.x += this.speed * Math.cos(this.angle);
        this.width -= 0.2;
        this.height -= 0.2;
        if (this.width <=0) {
            bullets.splice(positionInArray, 1);
        }
    }

    if (this.type === 0) {
        for (var enemy in enemies) {
            if (this.x + this.width / 2 > enemies[enemy].x - enemies[enemy].width / 2 &&
                this.x -this.width / 2 < enemies[enemy].x + enemies[enemy].width / 2 &&
                this.y + this.height / 2 > enemies[enemy].y - enemies[enemy].height / 2 &&
                this.y -this.height / 2 < enemies[enemy].y + enemies[enemy].height / 2
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



        for (var asteroid in asteroids) {
            console.log(asteroids[asteroid].height)
            if (this.x + this.width / 2 > asteroids[asteroid].x - asteroids[asteroid].width / 2 &&
                this.x -this.width / 2 < asteroids[asteroid].x + asteroids[asteroid].width / 2 &&
                this.y + this.height / 2 > asteroids[asteroid].y - asteroids[asteroid].height / 2 &&
                this.y -this.height / 2 < asteroids[asteroid].y + asteroids[asteroid].height / 2
            ) {
                var rand = Math.random();
                if (rand > 0.95) {
                    items.push(new Item(asteroids[asteroid].x, asteroids[asteroid].y, "energy"));
                } else if (rand > 0.8) {
                    items.push(new Item(asteroids[asteroid].x, asteroids[asteroid].y, "ammo"));
                }
                audio.playBoom();
                player.addScore(50);
                if(asteroids[asteroid].size < 4){
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"right","up"));
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"left","down"));
                }
                asteroids.splice(asteroid, 1);
                
                bullets.splice(positionInArray, 1);
                break;
            }
        }



    } 
    if (this.type !== 0) {
        if (gameOver) {
            return;
        }
        if(!player.inmune){
            if (this.x + this.width / 2 > player.x - player.width / 2 &&
                this.x -this.width / 2 < player.x + player.width / 2 &&
                this.y + this.height / 2 > player.y - player.height / 2 &&
                this.y -this.height / 2 < player.y + player.height / 2
            ) {
                audio.playBoom();
                player.removeScore(150);
                player.removeEnergy(1);
                bullets.splice(positionInArray, 1);
                player.inmune = true;
                clearTimeout(counterInmunity);
                counterInmunity = setTimeout("player.inmune = false",player.inmuneTime);
            }
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
