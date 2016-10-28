var Asteroid = function(x,y,speed,angle,size,directionx,directiony){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
    this.img = new Image();
    this.img.src = "img/aestroid/aestroid_brown.png";
    this.width = player.width*2/size;
    this.height = player.height*2/size;
    this.directionx = directionx;
    this.directiony = directiony;
}

Asteroid.prototype.tick = function() {
    this.update();
    this.render();
}

Asteroid.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, this.width, this.height, this.angle);
}

Asteroid.prototype.update = function() {
    this.angle += 0.05;
    switch (this.directionx){
        case "right":
            this.x += this.speed
            break;
        case "left":
            this.x -= this.speed
            break;
    }
    switch (this.directiony){
        case "up":
            this.y -= this.speed
            break;
        case "down":
            this.y += this.speed
            break;
    }
    if(this.x < 0){this.directionx = "right";}
    if(this.x > window.innerWidth){this.directionx = "left";}
    if(this.y < 0){this.directiony = "down";}
    if(this.y > window.innerHeight){this.directiony = "up"}
}

function spawnAsteroid (){
    asteroids.push(new Asteroid(10,10,1,0,1,"right","down"));
}

function updateAsteroids() {
    for (var asteroid in asteroids) {
        asteroids[asteroid].tick();
    }
}