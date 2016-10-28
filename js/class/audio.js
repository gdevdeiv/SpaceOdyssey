var GameAudio = function() {
    this.bso = new Audio("audio/bso.mp3");
    this.sounds = [];
};

GameAudio.prototype.init = function() {
    this.bso.volume = 0.05;
    this.bso.play();
};

GameAudio.prototype.playBoom = function() {
    var id = this.sounds.push(new Audio("audio/boom.wav")) - 1;
    this.sounds[id].volume = 0.05;
    this.sounds[id].ended = function() {
        this.sounds.splice(this.sounds[id], 1);
    };
    this.sounds[id].play();
};