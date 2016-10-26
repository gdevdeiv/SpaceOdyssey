var bIsMouseDown = false;
var keysX = [65, 37, 68, 39];
var keysY = [87, 38, 83, 40];
var tempX = 0;
var tempY = 0;

function initInput() {
    keyboardInput();
    mouseInput();
    //touchInput();
}

function keyboardInput() {
    $(document).keydown(function(event) {
        switch (event.which) {
            case 87: // W
            case 38: // Upper arrow
                goY(false);
                break;
            case 83: // S
            case 40: // Bottom arrow
                goY(true);
                break;
            case 65: // A
            case 37: // Left arrow
                goX(false);
                break;
            case 68: // D
            case 39: // Right arrow
                goX(true);
                break;
            case 32: // Space bar
                player.shoot();
                break;
        }
    });
    $(document).keyup(function(event) {
        if ($.inArray(event.which, keysX) != -1) {
            player.movementX = 0;
        }
        if ($.inArray(event.which, keysY) != -1) {
            player.movementY = 0;
        }
    });
}

function mouseInput() {
    /*$("#up").mousedown(function() { goY(false); });
    $("#down").mousedown(function() { goY(true); });
    $("#left").mousedown(function() { goX(false); });
    $("#right").mousedown(function() { goX(true); });
    $("#up").mouseup(function() { goStopY(); });
    $("#down").mouseup(function() { goStopY(); });
    $("#left").mouseup(function() { goStopX(); });
    $("#right").mouseup(function() { goStopX(); });
    $("#shoot").click(function() { shoot(); });*/
    $("#canvas").mousemove(function(event) {
        player.mouseX = event.clientX;
        player.mouseY = event.clientY;
    });
    $("#canvas").mousedown(function() {
        player.shoot();
    });
}

function touchInput() {
    $("#canvas").mousemove(function(event) {
        if (bIsMouseDown) {
            player.x = event.clientX - tempX;
            player.y = event.clientY - tempY;
        }
        $("#canvas").mousedown(function() {
            bIsMouseDown = true;
            tempX = event.clientX - player.x;
            tempY = event.clientY - player.y;
        });
    });
    $("#canvas").mouseup(function() {
        bIsMouseDown = false;
    });
}

function goX(b) {
    player.movementX = (b) ? 1 : -1;
}

function goY(b) {
    player.movementY = (b) ? 1 : -1;
}

function goStopX() {
    player.movementX = 0;
}

function goStopY() {
    player.movementY = 0;
}
