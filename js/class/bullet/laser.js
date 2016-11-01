var BulletLaser = function(enemyRef) {
    Bullet.call(this, 0, 0, 0, 0, 4);
    this.enemyRef = enemyRef;
    if (this.enemyRef.direction == "left" || this.enemyRef.direction == "right"){
        this.width = this.enemyRef.width/4;
        this.height = height-this.enemyRef.y;
        this.img.src = "img/laser_middle_rotated.png";
    }
    if (this.enemyRef.direction == "up" || this.enemyRef.direction == "down"){
        this.width = width-this.enemyRef.x;
        this.height = this.enemyRef.width/4;
    }
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    var laserExist = true;
    if(laserExist){
        console.log("la bala existe")
        if (this.enemyRef.direction == "left" || this.enemyRef.direction == "right"){
            this.x = this.enemyRef.x;
            this.y = height/2+this.enemyRef.y;
        }
        if (this.enemyRef.direction == "up" || this.enemyRef.direction == "down"){
            this.x = width/2+this.enemyRef.x;
            this.y = this.enemyRef.y;
        }
       
    }
};

