var BulletLaser = function(enemyRef, angle) {
    Bullet.call(this, 0, 0, 0, angle, 4);
    this.enemyRef = enemyRef;
    this.height = this.enemyRef.width / 4;

    this.enemyRef.shooting = false;

    this.imgStart = new Image();
    this.imgEnd = new Image();
    this.imgStart.src = "img/laser_start.png";
    this.imgEnd.src = "img/laser_end_ajustado.png";
};

BulletLaser.prototype = Object.create(Bullet.prototype);
BulletLaser.prototype.constructor = BulletLaser;
BulletLaser.prototype.die = function(bullet) {
    if(this.enemyRef.health < 1){
        this.destroyBullet(this);
    }
};

BulletLaser.prototype.update = function() {
    Bullet.prototype.update.call(this);
    this.die();
    while(this.enemyRef.angle > 2*Math.PI){
        this.enemyRef.angle -= 2*Math.PI;
    }
    while(this.enemyRef.angle < 0){
        this.enemyRef.angle += 2*Math.PI;
    }
    this.angle = this.enemyRef.angle;
    if (this.enemyRef.shooting == true){
        this.height = this.enemyRef.width / 4;
        this.angleCorner1 = Math.PI*2-Math.atan2(this.enemyRef.y, width - this.enemyRef.x);
        while(this.angleCorner1 > 2*Math.PI){
            this.angleCorner1 -= 2*Math.PI;
        }
        while(this.angleCorner1 < 0){
            this.angleCorner1 += 2*Math.PI;
        }
        this.angleCorner2 = Math.PI*2 - Math.atan2(this.enemyRef.y, -this.enemyRef.x);
        while(this.angleCorner2 > 2*Math.PI){
            this.angleCorner2 -= 2*Math.PI;
        }
        while(this.angleCorner2 < 0){
            this.angleCorner2 += 2*Math.PI;
        }
        this.angleCorner3 = Math.PI*2 - Math.atan2(this.enemyRef.y - height, -this.enemyRef.x);
        while(this.angleCorner3 > 2*Math.PI){
            this.angleCorner3 -= 2*Math.PI;
        }
        while(this.angleCorner3 < 0){
            this.angleCorner3 += 2*Math.PI;
        }
        this.angleCorner4 = Math.PI*2 - Math.atan2(this.enemyRef.y - height, width - this.enemyRef.x);
        while(this.angleCorner4 > 2*Math.PI){
            this.angleCorner4 -= 2*Math.PI;
        }
        while(this.angleCorner4 < 0){
            this.angleCorner4 += 2*Math.PI;
        }
        if(this.angle == 0){
            this.deltaX = width - this.enemyRef.x;
            this.deltaY = 0;
        }
        if(this.angle == Math.PI/2){
            this.deltaX = 0;
            this.deltaY = height-this.enemyRef.y;
        }
        if(this.angle == Math.PI){
            this.deltaX = this.enemyRef.x;
            this.deltaY = 0;
        }
        if(this.angle == 3*Math.PI/2){
            this.deltaX = 0;
            this.deltaY = this.enemyRef.y;
        }
        if(this.angle == this.angleCorner1){
            this.deltaX = width - this.enemyRef.x;
            this.deltaY = this.enemyRef.y;
        }
        if(this.angle == this.angleCorner2){
            this.deltaX = this.enemyRef.x;
            this.deltaY = this.enemyRef.y;
        }
        if(this.angle == this.angleCorner3){
            this.deltaX = this.enemyRef.x;
            this.deltaY = height - this.enemyRef.y;
        }
        if(this.angle == this.angleCorner4){
            this.deltaX = width - this.enemyRef.x;
            this.deltaY = height - this.enemyRef.y
        }
        if(this.angle > 0 && this.angle < this.angleCorner4){
            this.deltaX = width - this.enemyRef.x;
            this.deltaY = -Math.tan(this.angle)*this.deltaX;
        }
        if(this.angle > this.angleCorner4 && this.angle < Math.PI/2){
            this.deltaY = this.enemyRef.y - height;
            this.deltaX = this.deltaY / Math.tan(this.angle);
        }
        if(this.angle > Math.PI/2 && this.angle < this.angleCorner3){
            this.deltaY = this.enemyRef.y - height;
            this.deltaX = -this.deltaY / Math.tan(this.angle);
        }
        if(this.angle > this.angleCorner3 && this.angle < Math.PI){
            this.deltaX = -this.enemyRef.x;
            this.deltaY = -Math.tan(this.angle)*this.deltaX;
        }
        if(this.angle > Math.PI && this.angle < this.angleCorner2){
            this.deltaX = -this.enemyRef.x;
            this.deltaY = -Math.tan(this.angle)*this.deltaX;//ok
        }
        if(this.angle > this.angleCorner2 && this.angle < 3*Math.PI/2){
            this.deltaY = this.enemyRef.y;
            this.deltaX = this.deltaY / Math.tan(this.angle);
        }
        if(this.angle > 3*Math.PI/2 && this.angle < this.angleCorner1){
            this.deltaY = this.enemyRef.y;
            this.deltaX = this.deltaY / Math.tan(this.angle);
        }
        if(this.angle > this.angleCorner1 && this.angle < 2*Math.PI){
            this.deltaX = width - this.enemyRef.x;
            this.deltaY = Math.tan(this.angle)*this.deltaX;
        }
        this.hitPlayer();
        this.hitAsteroid();
        this.width = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2)) - (this.height*2 + this.enemyRef.width/2);
    }


    if (this.enemyRef.shooting == false) {
        this.width = 0;
        this.height = 0;
    }

    this.x = this.enemyRef.x + (this.enemyRef.width/2 + this.height + this.width/2) * Math.cos(this.angle);
    this.y = this.enemyRef.y + (this.enemyRef.width/2 + this.height + this.width/2) * Math.sin(this.angle);
   
    drawRotatedImage(this.img, this.x, this.y, this.width, this.height, this.angle);
    drawRotatedImage(this.imgStart, this.x - (this.width/2 + this.height/2) * Math.cos(this.angle), this.y - (this.width/2 + this.height/2) * Math.sin(this.angle), this.height, this.height, this.angle);
    drawRotatedImage(this.imgEnd, this.x + (this.width/2 + this.height/2) * Math.cos(this.angle), this.y + (this.width/2 + this.height/2) * Math.sin(this.angle), this.height, this.height, this.angle);
    
    

};

BulletLaser.prototype.hitPlayer = function() {
    this.realDeltaY = player.y - this.enemyRef.y;
    if(player.x > this.enemyRef.x && player.y < this.enemyRef.y){ //1
        this.tanReal = Math.tan(this.angle);
    }
    if(player.x < this.enemyRef.x && player.y < this.enemyRef.y){ //2
        this.tanReal = -Math.tan(Math.PI - this.angle);
    }
    if(player.x < this.enemyRef.x && player.y > this.enemyRef.y){  //3 
        this.tanReal = -Math.tan(Math.PI-this.angle);
    }
    if(player.x > this.enemyRef.x && player.y > this.enemyRef.y){ //4
        this.tanReal = Math.tan(this.angle);
    }
    this.theoricalDeltaX = this.realDeltaY / this.tanReal;
    if( player.x + player.width/2 > this.enemyRef.x + this.theoricalDeltaX &&
    player.x - player.width/2 < this.enemyRef.x + this.theoricalDeltaX
    ){
        this.deltaX = player.x - this.enemyRef.x;
        this.deltaY = player.y - this.enemyRef.y;
        if (!player.inmune){
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            player.inmune = true;
            clearTimeout(counterInmunity);
            counterInmunity = setTimeout(function() {
                player.inmune = false;   
            }, player.inmuneTime);
        }
    }
    if(this.angle == 0&&
    player.y+player.height/2 > this.enemyRef.y &&
    player.y-player.height/2 < this.enemyRef.y
    ){
        this.deltaX = player.x - this.enemyRef.x;
        this.deltaY = player.y - this.enemyRef.y;
        if (!player.inmune){
            audio.playBoom();
            player.removeScore(150);
            player.removeEnergy(1);
            player.inmune = true;
            clearTimeout(counterInmunity);
            counterInmunity = setTimeout(function() {
                player.inmune = false;   
            }, player.inmuneTime);
        }
    }
};

BulletLaser.prototype.hitAsteroid = function() {
    for(var asteroid in asteroids){
        this.realDeltaY = asteroids[asteroid].y - this.enemyRef.y;
        if(asteroids[asteroid].x > this.enemyRef.x && asteroids[asteroid].y < this.enemyRef.y){ //1
            this.tanReal = Math.tan(this.angle);
        }
        if(asteroids[asteroid].x < this.enemyRef.x && asteroids[asteroid].y < this.enemyRef.y){ //2
            this.tanReal = -Math.tan(Math.PI - this.angle);
        }
        if(asteroids[asteroid].x < this.enemyRef.x && asteroids[asteroid].y > this.enemyRef.y){  //3 
            this.tanReal = -Math.tan(Math.PI-this.angle);
        }
        if(asteroids[asteroid].x > this.enemyRef.x && asteroids[asteroid].y > this.enemyRef.y){ //4
            this.tanReal = Math.tan(this.angle);
        }
        this.theoricalDeltaX = this.realDeltaY / this.tanReal;
        if( asteroids[asteroid].x + asteroids[asteroid].width/2 > this.enemyRef.x + this.theoricalDeltaX &&
        asteroids[asteroid].x - asteroids[asteroid].width/2 < this.enemyRef.x + this.theoricalDeltaX
        ){
            this.deltaX = asteroids[asteroid].x - this.enemyRef.x;
            this.deltaY = asteroids[asteroid].y - this.enemyRef.y;
            if (!asteroids[asteroid].inmune){
                audio.playBoom();
                if (asteroids[asteroid].size < 4) {
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"right","up"));
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"left","down"));
                }
                asteroids.splice(asteroid, 1);
            }
        }
        if(this.angle == 0&&
        asteroids[asteroid].y+asteroids[asteroid].height/2 > this.enemyRef.y &&
        asteroids[asteroid].y-asteroids[asteroid].height/2 < this.enemyRef.y
        ){
            this.deltaX = asteroids[asteroid].x - this.enemyRef.x;
            this.deltaY = asteroids[asteroid].y - this.enemyRef.y;
            if (!asteroids[asteroid].inmune){
                audio.playBoom();
                if (asteroids[asteroid].size < 4) {
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"right","up"));
                    asteroids.push(new Asteroid(asteroids[asteroid].x,asteroids[asteroid].y,asteroids[asteroid].speed,0,asteroids[asteroid].size+1,"left","down"));
                }
                asteroids.splice(asteroid, 1);
            }
        }
    }
};