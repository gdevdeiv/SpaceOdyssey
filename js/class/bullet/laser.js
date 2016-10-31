var BulletLaser = function(x, y, speed, angle, direction) {
    Bullet.call(this, x, y, speed, angle, 4);
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.playerCollision();
    this.asteroidCollision();
};