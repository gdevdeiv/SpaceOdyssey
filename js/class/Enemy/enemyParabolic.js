var EnemyParabolic = function(x, y, speed, angle, angularSpeed, animation) {
    Enemy.call(this, x, y, speed, angle, angularSpeed, animation);
};

EnemyParabolic.prototype = Object.create(Enemy.prototype);
EnemyParabolic.prototype.constructor = EnemyParabolic;

EnemyParabolic.prototype.update = function() {
    Enemy.prototype.update.call(this);
    this.x += this.speed*Math.cos(this.angle);
    this.y += this.speed*Math.sin(this.angle);
    if (this.x > width*0.4){
        if (this.angle > -Math.PI/6){
            this.angle -= this.angularSpeed;
        }
    }

    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
    var _dx = player.x - this.x;
    var _dy = player.y - this.y;
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