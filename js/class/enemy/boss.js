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
    this.chargeTick = ticks;
    this.chargePreparation = 60;
    this.saveSpeed = this.speed;
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
        this.moveInitialPosition();   
    }

    if (this.pattern == 1){ //movimiento en círculos
        this.circularMovement();
    }
    if (this.pattern == 2){ // embestida
        this.charge();
    }
    if (ticks % this.animation.getUpdateFrequency() === 0) {
        this.animation.tick();
    }
};









EnemyBoss.prototype.moveInitialPosition = function(){
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
            if(this.x > width/2 - (this.speed + 2) &&
            this.x < width/2 + (this.speed + 2) &&
            this.y > this.height/2 - (this.speed + 2) &&
            this.y < this.height/2 + (this.speed + 2)
            ){
                this.shootRadial();
                console.log("patron 1 cicrulos")
                this.pattern++;
                this.centerY = height/2;
                this.radius = this.centerY-this.y;
                this.centerX = this.x-0.01;
                this.durationPattern2 = 1000 + Math.random()*500;
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
                console.log("patron 1 circulos")
                this.pattern++;
                this.centerY = height/2;
                this.radius = this.centerY-this.y;
                this.centerX = this.x-0.01;
                this.durationPattern2 = 1000 + Math.random()*500;
                this.saveSpeed = this.speed;
            }
        }
}

EnemyBoss.prototype.circularMovement = function(){
    if (this.y < this.centerY){
        this.x+= this.speed/2;
    }
    if (this.y > this.centerY){
        this.x-= this.speed/2;
    }
    sqroot = Math.sqrt(this.radius * this.radius - (this.x - this.centerX)*(this.x - this.centerX));
    if (this.x > this.centerX && this.y < this.centerY){ // primer cuadrante
        this.y = -sqroot + this.centerY;
        if (this.y > this.centerY-50){this.y = this.centerY+1}
        this.speed -= this.aceleration;
    }
    if (this.x > this.centerX && this.y > this.centerY){ // cuarto cuadrante
        this.y = sqroot + this.centerY;
        this.speed += this.aceleration;
    }
    if(this.x < this.centerX && this.y > this.centerY){ //tercer cuadrante
        this.y = sqroot + this.centerY;
        if (this.y < this.centerY+50){this.y = this.centerY-1}
        this.speed -= this.aceleration;
    }
    if(this.x < this.centerX && this.y < this.centerY){ //segundo cuadrante
        this.y=-sqroot + this.centerY;
        this.speed += this.aceleration;
    }
    this.durationPattern2--;
    if(this.durationPattern2 < 0){
        console.log("patron 2 carga")
        this.shootRadial();
        this.shootSimple();
        this.shootFollower();
        this.pattern++  
        this.chargeTick = ticks;
        this.chargeAngle = this.angle;
        this.speed = this.saveSpeed;
    }
}

EnemyBoss.prototype.charge = function(){
    this.angle = this.chargeAngle;
    if(ticks - this.chargeTick < this.chargePreparation){
        console.log("preparando");
        this.x += this.speed*0.1*Math.cos(this.angle - Math.PI);
        this.y += this.speed*0.1*Math.sin(this.angle - Math.PI);
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y < 0) {
            this.y = 0;
        }
        if (this.x > width-10) {
            this.x = width-10;
        }
        if (this.y > height - 10) {
            this.y = height - 10;
        }

    }else{
        console.log("cargando")
        this.x += this.speed*3*Math.cos(this.angle);
        this.y += this.speed*3*Math.sin(this.angle);
        if(this.x < 30 || this.y < 30 || this.x > width - 30 || this.y > height - 30){
            console.log("vuelta a empezar, patron 0");
            this.pattern = 0;
        }
    }
}