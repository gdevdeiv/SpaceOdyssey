var EnemyBoss = function(x, y, speed, angle, animation) {
    Enemy.call(this, x, y, speed, angle, animation);
    this.pattern = 0;
    this.width = player.width*3;
    this.height = player.height*3;
    this.health = 200;
    this.maxHealth = 200;
    this.simpleTick = ticks;
    this.ticksBetwnSimple = 58;
    this.radialTick = ticks;
    this.ticksBetwnRadial = 401;
    this.followerTick = ticks;
    this.ticksBetwnFollower = 503;
    this.chargeTick = ticks;
    this.chargePreparation = 60;
    this.saveSpeed = this.speed;
    this.shoot = true;
    this.shooting = false;
};

EnemyBoss.prototype = Object.create(Enemy.prototype);
EnemyBoss.prototype.constructor = EnemyBoss;

EnemyBoss.prototype.update = function() {
    Enemy.prototype.update.call(this);
    if (this.shoot == true){
        this.shootLaser(); //crea el laser
        this.shoot = false;
    }


   if (ticks - this.simpleTick > this.ticksBetwnSimple){
        this.shootSimple();
        this.simpleTick = ticks;
    }
    if (ticks - this.radialTick > this.ticksBetwnRadial){
        this.shootRadial();
        this.radialTick = ticks;
    }
    if (ticks - this.followerTick > this.ticksBetwnFollower){
        this.shootFollower();
        this.followerTick = ticks;
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
    if (this.pattern == 3){
        this.moveToCenter(); // mueve al centro
    }
    if (this.pattern == 4){
        this.shooting = true;
        this.circularShooting();
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
                this.pattern++;
                this.centerY = height/2;
                this.radius = this.centerY-this.y;
                this.centerX = this.x-0.01;
                this.durationPattern2 = 300 + Math.random()*500;
                this.saveSpeed = this.speed;
                this.circAngle = 3*Math.PI/2;
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
                this.pattern++;
                this.centerY = height/2;
                this.radius = this.centerY - this.y;
                this.centerX = this.x;
                this.durationPattern2 = 300 + Math.random()*500;
                this.saveSpeed = this.speed;
                this.circAngle = 3*Math.PI/2;
            }
        }
}

EnemyBoss.prototype.circularMovement = function(){
    this.x = this.centerX + this.radius * Math.cos(this.circAngle);
    this.y = this.centerY + this.radius * Math.sin(this.circAngle);
    this.circAngle += 0.01;
    
    
    /*if (this.y < this.centerY ){
        this.x += this.speed;
        if(this.x > this.centerX + this.radius){
            console.log("ojo")
            this.x = this.centerx + this.radius - 1;
            this.y = this.centerY + 1;
        }
    }
    if (this.y > this.centerY){
        this.x-= this.speed;
        if(this.x < this.centerX - this.radius){
            this.x = this.centerX - this.radius + 1;
            this.y = this.centerY - 1
        }
    }

    sqroot = Math.sqrt(Math.pow(this.radius,2) - Math.pow((this.x-this.centerX),2));

   if (this.x > this.centerX && this.y < this.centerY){ // primer cuadrante
        this.y = -sqroot + this.centerY;
        if (this.y > this.centerY-30){this.y = this.centerY+1}
        this.speed -= this.aceleration;
    }
    if (this.x > this.centerX && this.y > this.centerY){ // cuarto cuadrante
        this.y = sqroot + this.centerY;
        this.speed += this.aceleration;
    }
    if(this.x < this.centerX && this.y > this.centerY){ //tercer cuadrante
        this.y = sqroot + this.centerY;
        if (this.y < this.centerY+30){this.y = this.centerY-1}
        this.speed -= this.aceleration;
    }
    if(this.x < this.centerX && this.y < this.centerY){ //segundo cuadrante
        this.y=-sqroot + this.centerY;
        this.speed += this.aceleration;
    }*/


    this.durationPattern2--;
    if(this.durationPattern2 < 0){
        this.shootRadial();
        this.shootSimple();
        this.shootFollower();
        this.pattern++; 
        this.chargeTick = ticks;
        this.chargeAngle = this.angle;
        this.speed = this.saveSpeed;
    }
}

EnemyBoss.prototype.charge = function(){
    this.angle = this.chargeAngle;
    if(ticks - this.chargeTick < this.chargePreparation){
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
        this.x += this.speed*3*Math.cos(this.angle);
        this.y += this.speed*3*Math.sin(this.angle);
        if(this.x < 30 || this.y < 30 || this.x > width - 30 || this.y > height - 30){
            this.pattern ++;
        }
    }
}

EnemyBoss.prototype.moveToCenter = function(){
    if (this.x < width/2){
        this.x += this.speed;
    }
    if (this.x > width/2) {
        this.x -= this.speed;
    }
    if (this.y < height/2) {
        this.y += this.speed;
    }
    if (this.y > height/2) {
        this.y -= this.speed;
    }
    if(this.x > width/2 - this.speed+1 &&
    this.x < width/2 + this.speed+1 &&
    this.y > height/2 - this.speed+1 &&
    this.y < height/2 + this.speed+1
    ){
        this.shootRadial();
        this.pattern++;
        this.durationPattern3 = 1000 + Math.random()*200;
        this.initialAngle = this.angle;
        this.shooting = true;
    }
}

EnemyBoss.prototype.circularShooting = function(){
    this.initialAngle += 0.01;
    this.angle = this.initialAngle;
    this.durationPattern3--;
    if(this.durationPattern3 < 0){
        this.shooting = false;
        this.pattern = 0;
    } 
}