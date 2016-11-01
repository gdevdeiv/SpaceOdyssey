var GameMenu = function() {};

GameMenu.prototype.init = function() {
    $("#play").click(function() {
        $("#menu").fadeOut("slow", function() {
            clearTimeout(temp);
            clearCanvas();
            start();
        });
    });
    $("#replay").click(function() {
        window.location = window.location;
    });
};

GameMenu.prototype.showGameOver = function() {
    $("#nrounds").html(round);
    $("#nscore").html(player.getScore());
    $("#gameover").fadeIn("slow");
};