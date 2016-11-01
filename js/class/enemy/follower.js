var EnemyFollower = function(x, y, speed, angle, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
};

EnemyFollower.prototype = Object.create(Enemy.prototype);
EnemyFollower.prototype.constructor = EnemyFollower;

EnemyFollower.prototype.update = function() {
    Enemy.prototype.update.call(this);
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    var _dx = player.x - this.x;
    var _dy = player.y - this.y;
    this.angle = Math.atan2(_dy, _dx);
    if (ticks % (Math.round(Math.random() * 50) + 150) === 0) {
        this.shootSimple();
    }
};