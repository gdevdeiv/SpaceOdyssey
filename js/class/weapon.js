var Weapon = function(recoil, rate, cooldown) {
    this.recoil = recoil;
    this.rate = rate;
    this.cooldown = cooldown;
    this.hasCooldown = false;
    this.firstTime = true;
    this.lastTick = 0;
    this.active = false;
};

Weapon.prototype.toggle = function() {
    this.active = !this.active;
};

Weapon.prototype.shoot = function() {
    if (this.hasCooldown) {
        return;
    }
    // Si hace menos de 4 ticks que he disparado
    if (ticks - this.lastTick < this.rate) {
        // NO dispares
        return;
    }
    this.lastTick = ticks;
};

Weapon.prototype.endShoot = function() {
    this.hasCooldown = true;
    setTimeout(function() {
        this.hasCooldown = false;
    }, this.cooldown);
};