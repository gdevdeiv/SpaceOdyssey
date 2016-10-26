var Item = function(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.img = new Image();
	this.img.src = "img/" + this.type + ".png";
};

Item.prototype.tick = function() {
	this.update();
	this.render();
};

Item.prototype.update = function() {
	this.x--;
	this.y += (Math.random() * 4) - 2;
	if (Math.abs(this.x - player.x) < 150 && Math.abs(this.y - player.y) < 150) {
		if (this.type == "energy") {
			player.addEnergy(1);
		} else if (this.type == "ammo") {
			player.addAmmo(5);
		}
		player.addScore(25);
		items.splice(this, 1);
	}
};

Item.prototype.render = function() {
	context.drawImage(this.img, this.x, this.y, 128, 128);
};

function spawnItem(x, y, type) {
	items.push(new Item(x, y, type));
}

function updateItems() {
    for (var item in items) {
        items[item].tick();
    }
}
