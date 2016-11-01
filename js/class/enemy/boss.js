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
    this.aceleration = 0.01;
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
        if(width > height){ //para pantalla horizontal
            if(this.y < this.height/2){
                this.y += this.speed;
            }
            if(this.y > this.height/2){
                this.y -= this.speed;
            }
            if(this.x > width/2 - this.speed+1 &&
            this.x < width/2 + this.speed+1 &&
            this.y > this.height/2 - this.speed+1 &&
            this.y < this.height/2 + this.speed+1
            ){
                this.shootRadial();
                console.log("patron 1")
                this.pattern++;
                centerY = height/2;
                radius = centerY-this.y;
                centerX = this.x-0.01;
                durationPattern2 = 1000 + Math.random()*500;
            }
        }
        if(width < height){ //para pantalla vertical height/2-width/2
            if(this.y < height/2-width/2){
                this.y += this.speed;
            }
            if(this.y > height/2-width/2){
                this.y -= this.speed;
            }
            if(this.x > width/2 - this.speed+1 &&
            this.x < width/2 + this.speed+1 &&
            this.y > height/2-width/2 - this.speed+1 &&
            this.y < height/2-width/2 + this.speed+1
            ){
                this.shootRadial();
                console.log("patron 1")
                this.pattern++;
                centerY = height/2;
                radius = centerY-this.y;
                centerX = this.x-0.01;
                durationPattern2 = 1000 + Math.random()*500;
            }
        }
        
    }
    if (this.pattern == 1){ //movimiento en círculos
        if (this.y < centerY){
            this.x+= this.speed/2;
        }
        if (this.y > centerY){
            this.x-= this.speed/2;
        }
        sqroot = Math.sqrt(radius * radius - (this.x - centerX)*(this.x - centerX));
        if (this.x > centerX && this.y < centerY){ // primer cuadrante
            this.y = -sqroot+centerY;
            if (this.y > centerY-50){this.y = centerY+1}
            this.speed -= this.aceleration;
        }
        if (this.x > centerX && this.y > centerY){ // cuarto cuadrante
            this.y = sqroot+centerY;
            this.speed += this.aceleration;
        }
        if(this.x < centerX && this.y > centerY){ //tercer cuadrante
            this.y = sqroot+centerY;
            if (this.y < centerY+50){this.y = centerY-1}
            this.speed -= this.aceleration;
        }
        if(this.x < centerX && this.y < centerY){ //segundo cuadrante
            this.y=-sqroot+centerY;
            this.speed += this.aceleration;
        }
        durationPattern2--;
        if(durationPattern2 < 0){
            console.log("pattern 3")
            this.pattern++
        }
    }
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
};