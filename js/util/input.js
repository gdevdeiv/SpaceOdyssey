var GameInput = function() {
    this.bIsMouseDown = false;
    this.keysX = [65, 37, 68, 39];
    this.keysY = [87, 38, 83, 40];
    this.tempX = 0;
    this.tempY = 0;
};

GameInput.prototype.init = function() {
    this.initKeyboard();
    this.initMouse();
    // this.touchInput();
};

GameInput.prototype.initKeyboard = function() {
    $(document).keydown(function(event) {
        if (event.which == 87 || event.which == 38) { // W, Upper arrow
            goY(false);
        }
        if (event.which == 83 || event.which == 40) { // S, Bottom arrow
            goY(true);
        }
        if (event.which == 65 || event.which == 37) { // A, Left arrow
            goX(false);
        }
        if (event.which == 68 || event.which == 39) { // D, Right arrow
            goX(true);
        }
        if (event.which == 32) { // Space bar
            player.shoot();
        }
    });
    $(document).keyup(function(event) {
        if (event.which == 87 || event.which == 38) {
            if (player.movementY !== 1) {
                goStopY();
            }
        }
        if (event.which == 83 || event.which == 40) {
            if (player.movementY !== -1) {
                goStopY();
            }
        }
        if (event.which == 65 || event.which == 37) {
            if (player.movementX !== 1) {
                goStopX();
            }
        }
        if (event.which == 68 || event.which == 39) {
            if (player.movementX !== -1) {
                goStopX();
            }
        }
    });
};

GameInput.prototype.initMouse = function() {
    /* $("#up").mousedown(function() { goY(false); });
    $("#down").mousedown(function() { goY(true); });
    $("#left").mousedown(function() { goX(false); });
    $("#right").mousedown(function() { goX(true); });
    $("#up").mouseup(function() { goStopY(); });
    $("#down").mouseup(function() { goStopY(); });
    $("#left").mouseup(function() { goStopX(); });
    $("#right").mouseup(function() { goStopX(); });
    $("#shoot").click(function() { shoot(); }); */
    $("#canvas").mousemove(function(event) {
        player.mouseX = event.clientX;
        player.mouseY = event.clientY;
    });
    $("#canvas").mousedown(function() {
        player.shoot();
    });
};

/* GameInput.prototype.initTouch = function() {
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
}; */

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
