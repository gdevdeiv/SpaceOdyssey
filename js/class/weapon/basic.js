var WeaponBasic = function() {
    Weapon.call(this, 2, 4);
};

WeaponBasic.prototype = Object.create(Weapon.prototype);
WeaponBasic.prototype.constructor = WeaponBasic;

WeaponBasic.prototype.shoot = function() {
    Weapon.prototype.shoot.call(this);

    if (!this.isFinallyShooting) {
        return;
    }

    bullets.push(new BulletFriendly(player.x + 75 * Math.cos(player.angle), player.y + 75 * Math.sin(player.angle), player.shootSpeed, player.angle));
    player.speedX -= Math.cos(player.angle) * this.recoil;
    player.speedY -= Math.sin(player.angle) * this.recoil;

    Weapon.prototype.endShoot.call(this);
};