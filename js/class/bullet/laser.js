var BulletLaser = function(enemyRef) {
    Bullet.call(this, 0, 0, 0, 0, 4);
    this.enemyRef = enemyRef;
    if (this.enemyRef.direction == "left"){
        this.width = this.enemyRef.width/4;
        this.height = height-this.enemyRef.y;
        this.laserOff = this.enemyRef.x - Math.random() * (width - (width - this.enemyRef.x));
        this.img.src = "img/laser_middle_rotated.png";
    }
    if (this.enemyRef.direction == "right"){
        this.width = this.enemyRef.width/4;
        this.height = height-this.enemyRef.y;
        this.laserOff = this.enemyRef.x + Math.random() * (width - this.enemyRef.x);
        this.img.src = "img/laser_middle_rotated.png";
    }
    if (this.enemyRef.direction == "up"){
        this.width = width-this.enemyRef.x;
        this.height = this.enemyRef.width/4;
        this.laserOff = this.enemyRef.y - Math.random() * (height - (height - this.enemyRef.y));
    }
    if (this.enemyRef.direction == "down"){
        this.width = width-this.enemyRef.x;
        this.height = this.enemyRef.width/4;
        this.laserOff = this.enemyRef.y + Math.random() * (height - this.enemyRef.y);
    }
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    if (this.enemyRef.direction == "left"){
        this.x = this.enemyRef.x;
        this.y = height/2+this.enemyRef.y;
        if(this.x < this.laserOff && this.x > this.laserOff - this.enemyRef.width * 5){
            this.width = 0;
        }
        if(this.x < this.laserOff - this.enemyRef.width * 5){
            this.width = this.enemyRef.width/4;
        }
    }
    if (this.enemyRef.direction == "right"){
        this.x = this.enemyRef.x;
        this.y = height/2 + this.enemyRef.y;
        if(this.x > this.laserOff && this.x < this.laserOff + this.enemyRef.width * 5){
            this.width = 0;
        }
        if(this.x > this.laserOff + this.enemyRef.width * 5){
            this.width = this.enemyRef.width/4;
        }
    }
    if (this.enemyRef.direction == "up"){
        this.x = width/2 + this.enemyRef.x;
        this.y = this.enemyRef.y;
        if(this.y < this.laserOff && this.y > this.laserOff - this.enemyRef.width * 5){
            console.log("desactiva")
            this.height = 0;
        }
        if(this.y < this.laserOff - this.enemyRef.width * 5){
            this.height = this.enemyRef.width/4;
        }
    }
    if (this.enemyRef.direction == "down"){
        this.x = width/2 + this.enemyRef.x;
        this.y = this.enemyRef.y;
        if(this.y > this.laserOff && this.y < this.laserOff + this.enemyRef.width * 5){
            this.height = 0;
        }
        if(this.y > this.laserOff + this.enemyRef.width * 5){
            this.height = this.enemyRef.width/4;
        }
    }
};

