var BulletRadial = function(x, y, speed, angle) {
    Bullet.call(this, x, y, speed, angle, 2);
};

BulletRadial.prototype = Object.create(Bullet.prototype);
BulletRadial.prototype.constructor = BulletRadial;

BulletRadial.prototype.update = function() {
    Bullet.prototype.update.call(this);
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.playerCollision();
    this.asteroidCollision();
};