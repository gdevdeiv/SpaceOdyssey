var BulletFollower = function(x, y, speed, angle) {
    Bullet.call(this, x, y, speed, angle, 3);
};

BulletFollower.prototype = Object.create(Bullet.prototype);
BulletFollower.prototype.constructor = BulletFollower;

BulletFollower.prototype.update = function() {
    Bullet.prototype.update.call(this);
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
    if (this.width <= player.width / 1.5) {
        this.destroyBullet(this);
    }
    this.playerCollision();
    this.asteroidCollision();
};