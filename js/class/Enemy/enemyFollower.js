var EnemyFollower = function(x, y, speed, angle) {
    Enemy.call(this, x, y, speed, angle, 3);
};

EnemyFollower.prototype = Object.create(Enemy.prototype);
EnemyFollower.prototype.constructor = EnemyFollower;

EnemyFollower.prototype.update = function() {
    Enemy.prototype.update.call(this);
    var positionInArray = enemies.indexOf(this);

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
    if (!player.inmune) {
        if (this.x + this.width / 2 > player.x - player.width / 2 &&
            this.x - this.width / 2 < player.x + player.width / 2 &&
            this.y + this.height / 2 > player.y - player.height / 2 &&
            this.y - this.height / 2 < player.y + player.height / 2
        ) {
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            enemies.splice(positionInArray, 1);
            player.inmune = true;
            clearTimeout(counterInmunity);
            counterInmunity = setTimeout(function() {
                player.inmune = false;
            }, player.inmuneTime);
        }
    }
};