var Sprite = function(src) {
    this.img = new Image();
    this.img.src = src;
};

Sprite.prototype.getImg = function() {
    return this.img;
};

Sprite.prototype.getSrc = function() {
    return this.img.src;
};