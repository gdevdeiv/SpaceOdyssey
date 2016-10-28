var BulletSimple = function(x, y, speed, angle) {
    Bullet.call(this, x, y, speed, angle, 1);
};

BulletSimple.prototype = Object.create(Bullet.prototype);
BulletSimple.prototype.constructor = BulletSimple;

BulletSimple.prototype.update = function() {
    Bullet.prototype.update.call(this);
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.playerCollision();
    this.asteroidCollision();
};