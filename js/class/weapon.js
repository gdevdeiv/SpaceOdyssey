var Weapon = function(recoil, rate, cooldown) {
    this.recoil = recoil;
    this.rate = rate;
    this.cooldown = cooldown;
    this.hasCooldown = false;
    this.firstTime = true;
    this.lastTick = 0;
    this.isFinallyShooting = true;
    this.active = false;
};

Weapon.prototype.toggle = function() {
    this.active = !this.active;
};

Weapon.prototype.shoot = function() {
    if (this.firstTime) {
        this.firstTime = false;
    }
    this.isFinallyShooting = (ticks - this.lastTick >= this.rate);
};

Weapon.prototype.endShoot = function() {
    this.lastTick = ticks;
};