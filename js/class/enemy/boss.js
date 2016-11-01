var EnemyBoss = function(x, y, speed, angle, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
    this.pattern = 0;
    this.width = player.width*3;
    this.height = player.height*3;
    this.health = 300;
    this.maxHealth = 300;
    this.simpleTick = ticks;
    this.ticksBetwnSimple = 100;
    this.radialTick = ticks;
    this.ticksBetwnRadial = 500;
    this.followerTick = ticks;
    this.ticksBetwnFollower = 1;
};

EnemyBoss.prototype = Object.create(Enemy.prototype);
EnemyBoss.prototype.constructor = EnemyBoss;

EnemyBoss.prototype.update = function() {
    Enemy.prototype.update.call(this);

    if (ticks - this.simpleTick > this.ticksBetwnSimple){
        this.shootSimple();
        this.simpleTick = ticks;
    }
    if (ticks - this.radialTick > this.ticksBetwnRadial){
        this.shootRadial();
        this.radialTick = ticks;
    }
    if (ticks - this.followerTick < this.ticksBetwnFollower){
        this.shootFollower();
    }
    var _dx = player.x - this.x;
    var _dy = player.y - this.y;
    this.angle = Math.atan2(_dy, _dx);

    if (this.pattern == 0){ //ves desplazandote hasta la posicion incial

        if(this.x < width/2){
            this.x += this.speed;
        }
        if(this.x > width/2){
            this.x -= this.speed;
        }
        if(this.y < this.height){
            this.y += this.speed;
        }
        if(this.y > this.height){
            this.y -= this.speed;
        }
        if(this.x > width/2 - 50 &&
        this.x < width/2 +50 &&
        this.y > this.height -50 &&
        this.y < this.height + 50
        ){
            this.shootRadial();
            console.log("patron 1")
            this.pattern++;
            radius = height/2.5;
            centerY = this.y + radius
            centerX = this.x-0.01;
        }
    }
    if (this.pattern == 1){ //movimiento en círculos
        if (this.y < centerY){
            this.x+= 2;
        }
        if (this.y > centerY){
            this.x-= 2;
        }
        sqroot = Math.sqrt(radius * radius - (this.x - centerX)*(this.x - centerX));
        if (this.x > centerX && this.y < centerY){ // primer cuadrante
            this.y = -sqroot+centerY;
            if (this.y > centerY-25){this.y = centerY+1}
        }
        if (this.x > centerX && this.y > centerY){ // cuarto cuadrante
            this.y = sqroot+centerY;
        }
        if(this.x < centerX && this.y > centerY){ //tercer cuadrante
            this.y = sqroot+centerY;
            if (this.y < centerY+25){this.y = centerY-1}
        }
        if(this.x < centerX && this.y < centerY){ //segundo cuadrante
            this.y=-sqroot+centerY;
        }
    }
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
};