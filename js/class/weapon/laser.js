var WeaponLaser = function() {
    Weapon.call(this, 4, 0);
};

WeaponLaser.prototype = Object.create(Weapon.prototype);
WeaponLaser.prototype.constructor = WeaponLaser;

WeaponLaser.prototype.shoot = function() {
    Weapon.prototype.shoot.call(this);

    if (!this.isFinallyShooting) {
        return;
    }

    bullets.push(new BulletLaser(this));
    player.speedX -= Math.cos(player.angle) * this.recoil;
    player.speedY -= Math.sin(player.angle) * this.recoil;

    Weapon.prototype.endShoot.call(this);
};