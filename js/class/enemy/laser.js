var EnemyLaser = function(x, y, speed, angle, direction, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
    this.direction = direction;
    this.shoot = true;
    this.shooting = false;
};

EnemyLaser.prototype = Object.create(Enemy.prototype);
EnemyLaser.prototype.constructor = EnemyLaser;

EnemyLaser.prototype.update = function() {
    Enemy.prototype.update.call(this);
    switch (this.direction) {
        case "up" :
            this.angle = 0
            this.y -= this.speed;
            break;
        case "down" :
            this.angle = 0
            this.y += this.speed;
            break;
        case "right":
            this.angle = Math.PI/2
            this.x += this.speed;
            break;
        case "left":
            this.angle = Math.PI/2
            this.x -= this.speed;
            break;
    }
    if (this.shoot == true){
        this.shootLaser();
        this.shoot = false;
    }

    if (ticks % 200 == 0) {
        this.shooting = !this.shooting;
    }
};