var EnemyFollower = function(x, y, speed, angle, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
};

EnemyFollower.prototype = Object.create(Enemy.prototype);
EnemyFollower.prototype.constructor = EnemyFollower;

EnemyFollower.prototype.update = function() {
    Enemy.prototype.update.call(this);
    this.x -= this.speedX;
    if (this.x > player.x) {
        if (this.y > player.y) {
            this.y -= this.speedY + ((Math.random() * 4) - 2);
        } else {
            this.y += this.speedY + ((Math.random() * 4) - 2);
        }
    } else {
        this.y += (Math.random() * 8) - 4;
    }
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
    var _dx = player.x - this.x;
    var _dy = player.y - this.y;
    this.angle = Math.atan2(_dy, _dx);
    if (ticks % (Math.round(Math.random() * 50) + 150) === 0) {
        this.shootSimple();
    }
    if (ticks % (Math.round(Math.random() * 50) + 200) === 0) {
        this.shootRadial();
    }
    if (ticks % (Math.round(Math.random() * 50) + 300) === 0) {
        this.shootFollower();
    }
};