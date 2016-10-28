var Asteroid = function(x,y,speed,angle){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.img = new Image();
    this.img.src = "img/aestroid/aestroid_brown.png"
    this.width = 500;
    this.heigth = 500;
    this.directionx = "right";
    this.directiony = "down";
}

Asteroid.prototype.tick = function() {
    this.update();
    this.render();
}

Asteroid.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, this.width, this.heigth, this.angle);
}

Asteroid.prototype.update = function() {
    this.angle += 0.01;
    if(this.directionx == "right"){
        this.x += this.speed;
    }
}

function spawnAsteroid (){
    asteroids.push(new Asteroid(10,10,0.9,0));
}

function updateAsteroids() {
    for (var asteroid in asteroids) {
        asteroids[asteroid].tick();
    }
}