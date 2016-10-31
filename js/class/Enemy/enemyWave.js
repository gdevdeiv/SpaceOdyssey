var EnemyWave = function(x, y, speed, angle, angularSpeed, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
    this.angularSpeed = angularSpeed;
};

EnemyWave.prototype = Object.create(Enemy.prototype);
EnemyWave.prototype.constructor = EnemyWave;

EnemyWave.prototype.update = function() {
    Enemy.prototype.update.call(this);
    this.x += this.speed*Math.cos(this.angle);
    this.y += this.speed*Math.sin(this.angle);
    if(this.angle > Math.PI/3){
        this.angularSpeed *= -1;
    }
    if(this.angle < -Math.PI/3){
        this.angularSpeed *= -1;
    }
    this.angle += this.angularSpeed;

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