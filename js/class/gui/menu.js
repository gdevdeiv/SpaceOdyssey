var GameMenu = function() {};

GameMenu.prototype.init = function() {
    $("#play").click(function() {
        $("#menu").fadeOut("slow", function() {
            clearTimeout(temp);
            clearCanvas();
            start();
        });
    });
};