var Asteroid = function(x,y,speed,angle){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.img = new Image();
    this.img.src = "img/aestroid/aestroid_brown.png"
    this.width = 100;
    this.heigth = 100;
    this.directionx = "right";
    this.directiony = "down";
}

Asteroid.prototype.tick = function() {
    this.update();
    this.render();
}

Asteroid.prototype.render = function() {
    drawRotatedImage(this.img, this.x, this.y, this.width, this.height, this.angle);
}

Asteroid.prototype.update = function() {
    this.x += this.speed;
}

function spawnAsteroid (){
    asteroids.push(new Asteroid(100,100,10,0));
}

function updateAsteroids() {
    for (var asteroid in asteroids) {
        asteroids[asteroid].tick();
    }
}