var Animation = function() {
    this.sprites = [];
    this.actualSprite = 0;
    this.updateFrequency = 4;
};

Animation.prototype.addSprite = function(sprite) {
    this.sprites.push(sprite);
};

Animation.prototype.getSprite = function(spriteId) {
    return this.sprites[spriteId];
};

Animation.prototype.getActualSprite = function() {
    return this.getSprite(this.actualSprite);
};

Animation.prototype.getUpdateFrequency = function() {
    return this.updateFrequency;
};

Animation.prototype.setUpdateFrequency = function(n) {
    if (n > 0) {
        this.updateFrequency = n;
        return true;
    }
    return false;
};

Animation.prototype.tick = function() {
    this.actualSprite++;
    if (this.actualSprite >= this.sprites.length) {
        this.actualSprite = 0;
    }
};