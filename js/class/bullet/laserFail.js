var BulletLaser = function(enemyRef) {
    Bullet.call(this, 0, 0, 0, 0, 4);
    this.enemyRef = enemyRef;
    this.height = this.enemyRef.width / 4;
    if (this.enemyRef.direction == "left"){
        this.width = height - this.enemyRef.y - this.enemyRef.height/2;
        this.laserOff = this.enemyRef.x - Math.random() * (width - (width - this.enemyRef.x));
    }
    if (this.enemyRef.direction == "right"){
        this.width = height - this.enemyRef.y - this.enemyRef.height/2;
        this.laserOff = this.enemyRef.x + Math.random() * (width - this.enemyRef.x);
    }
    if (this.enemyRef.direction == "up"){
        this.width = width - this.enemyRef.x - this.enemyRef.width/2;
        this.laserOff = this.enemyRef.y - Math.random() * (height - (height - this.enemyRef.y));
    }
    if (this.enemyRef.direction == "down"){
        this.width = width - this.enemyRef.x - this.enemyRef.width/2;
        this.laserOff = this.enemyRef.y + Math.random() * (height - this.enemyRef.y);
    }
    this.width -= this.height * 2;
    this.imgStart = new Image();
    this.imgEnd = new Image();
    this.imgStart.src = "img/laser_start.png";
    this.imgEnd.src = "img/laser_end_ajustado.png";
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    if (this.enemyRef.direction == "left") {
        this.x = this.enemyRef.x;
        this.y = height / 2 + this.enemyRef.y / 2;
        if (this.x < this.laserOff && this.x > this.laserOff - this.enemyRef.width * 5) {
            this.width = 0;
        }
        if (this.x < this.laserOff - this.enemyRef.width * 5) {
            this.width = this.enemyRef.width / 4;
        }
        //this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width/2
        //this.enemyRef.y + this.enemyRef.height/2 + this.height/2
        //this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width + this.height/2
        drawRotatedImage(this.img, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width/2, this.width, this.height, Math.PI/2);
        drawRotatedImage(this.imgStart, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height/2, this.height, this.height, Math.PI / 2);
        drawRotatedImage(this.imgEnd, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width + this.height/2, this.height, this.height, Math.PI / 2);
    }
    if (this.enemyRef.direction == "right") {
        this.x = this.enemyRef.x;
        this.y = height / 2 + this.enemyRef.y;
        if (this.x > this.laserOff && this.x < this.laserOff + this.enemyRef.width * 5){
            this.width = 0;
        }
        if (this.x > this.laserOff + this.enemyRef.width * 5){
            this.width = this.enemyRef.width / 4;
        }
        drawRotatedImage(this.img, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width/2, this.width, this.height, Math.PI/2);
        drawRotatedImage(this.imgStart, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height/2, this.height, this.height, Math.PI / 2);
        drawRotatedImage(this.imgEnd, this.enemyRef.x, this.enemyRef.y + this.enemyRef.height/2 + this.height + this.width + this.height/2, this.height, this.height, Math.PI / 2);
    }
    if (this.enemyRef.direction == "up") {
        this.x = width / 2 + this.enemyRef.x;
        this.y = this.enemyRef.y;
        if (this.y < this.laserOff && this.y > this.laserOff - this.enemyRef.width * 5){
            this.height = 0;
        }
        if (this.y < this.laserOff - this.enemyRef.width * 5){
            this.height = this.enemyRef.width/4;
        }
        drawRotatedImage(this.img, this.enemyRef.x + this.enemyRef.width/2 + this.width/2 +this.height, this.enemyRef.y, this.width, this.height, 0);
        drawRotatedImage(this.imgStart, this.enemyRef.x + this.enemyRef.width/2 + this.height/2, this.enemyRef.y, this.height, this.height,0);
        drawRotatedImage(this.imgEnd, this.enemyRef.x + this.enemyRef.width/2 + this.height + this.width + this.height/2, this.enemyRef.y, this.height, this.height, 0);
    }
    if (this.enemyRef.direction == "down") {
        this.x = width / 2 + this.enemyRef.x;
        this.y = this.enemyRef.y;
        if (this.y > this.laserOff && this.y < this.laserOff + this.enemyRef.width * 5) {
            this.height = 0;
        }
        if (this.y > this.laserOff + this.enemyRef.width * 5) {
            this.height = this.enemyRef.width / 4;
        }
        drawRotatedImage(this.img, this.enemyRef.x + this.enemyRef.width/2 + this.width/2 +this.height, this.enemyRef.y, this.width, this.height, 0);
        drawRotatedImage(this.imgStart, this.enemyRef.x + this.enemyRef.width/2 + this.height/2, this.enemyRef.y, this.height, this.height,0);
        drawRotatedImage(this.imgEnd, this.enemyRef.x + this.enemyRef.width/2 + this.height + this.width + this.height/2, this.enemyRef.y, this.height, this.height, 0);
    }
};

BulletLaser.prototype.render = function() {};
