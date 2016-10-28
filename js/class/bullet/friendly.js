var BulletFriendly = function(x, y, speed, angle) {
    Bullet.call(this, x, y, speed, angle, 0);
};

BulletFriendly.prototype = Object.create(Bullet.prototype);
BulletFriendly.prototype.constructor = BulletFriendly;

BulletFriendly.prototype.update = function() {
    Bullet.prototype.update.call(this);
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.enemyCollision();
    this.asteroidCollision();
};