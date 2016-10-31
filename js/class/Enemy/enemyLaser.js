var EnemyLaser = function(x, y, speed, angle, direction, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
    this.direction = direction;
};

EnemyLaser.prototype = Object.create(Enemy.prototype);
EnemyLaser.prototype.constructor = EnemyLaser;

EnemyLaser.prototype.update = function() {
    Enemy.prototype.update.call(this);
    switch (this.direction) {
        case "up" :
            this.y -= this.speed;
            break;
        case "down" :
            this.y += this.speed;
            break;
        case "right":
            this.x += this.speed;
            break;
        case "left":
            this.x -= this.speed;
            break;
    }
    /*if (ticks % (Math.round(Math.random() * 50) + 150) === 0) {
        this.shootLaser();
    }*/
};