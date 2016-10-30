var EnemyParabolic = function(x, y, speed, angle, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
};

EnemyParabolic.prototype = Object.create(Enemy.prototype);
EnemyParabolic.prototype.constructor = EnemyParabolic;

EnemyParabolic.prototype.update = function() {
    Enemy.prototype.update.call(this);
    var positionInArray = enemies.indexOf(this);

    this.x += this.speed*Math.cos(this.angle);
    this.y += this.speed*Math.sin(this.angle);
    if (this.x > width*0.4){
        if(this.angle > -Math.PI/6){
            this.angle -= 0.01;
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