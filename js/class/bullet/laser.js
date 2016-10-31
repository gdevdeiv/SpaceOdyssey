var BulletLaser = function(enemyRef) {
    Bullet.call(this, 0, 0, 0, 0, 5);
    this.enemyRef = enemyRef;
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    var laserExist = true;
    if(laserExist){
        console.log("la bala existe")
        this.x = this.enemyRef.x
        this.y = this.enemyRef.y
        setTimeout("this.laserExistFasle()",2000);
    }
};

BulletLaser.prototype.laserExistFalse = function () {
    laserExist = !laserExist;
    this.destroyBullet(this);
}