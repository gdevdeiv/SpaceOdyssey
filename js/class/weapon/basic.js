var WeaponBasic = function() {
    Weapon.call(this, 2, 4, 0);
};

WeaponBasic.prototype = Object.create(Weapon.prototype);
WeaponBasic.prototype.constructor = WeaponBasic;

WeaponBasic.prototype.shoot = function() {
    //Weapon.prototype.shoot.call(this);

    /*if (!this.hasCooldown) {
        this.lastTick = ticks;
        
    }else{
        if(ticks - this.lastTick >this.rate){
            this.hasCooldown = false;
        }
    }*/
    
    if (this.firstTime) {
        this.firstTime = false;
    } else {
        // Si hace menos de 4 ticks que he disparado
        if (ticks - this.lastTick < this.rate) {
            // NO dispares
            return;
        }
    }

    bullets.push(new BulletFriendly(player.x + 75 * Math.cos(player.angle), player.y + 75 * Math.sin(player.angle), player.shootSpeed, player.angle));
    player.speedX -= Math.cos(player.angle) * this.recoil;
    player.speedY -= Math.sin(player.angle) * this.recoil;

    this.lastTick = ticks;

    //Weapon.prototype.endShoot.call(this);
    //this.hasCooldown = true;
    /*setTimeout(function() {
        this.hasCooldown = false;
    }, this.cooldown);*/
};