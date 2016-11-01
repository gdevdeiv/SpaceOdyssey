function updateHud() {
    updateEnergy();
    updateScore();
    updateRoundInfo();
}

function updateEnergy() {
    var maxEnergy = player.getMaxEnergy();
    var energyLeft = maxEnergy - player.getEnergy();
    for (var i = 0; i < (maxEnergy - energyLeft); i++) {
        context.fillStyle = "#E39415";
        context.fillRect(20 + (i * 25), 20, 20, 20);
    }
    for (var j = 0; j < energyLeft; j++) {
        context.fillStyle = 'rgba(227, 148, 21, 0.4)';
        context.fillRect(265 - (20 + (j * 25)), 20, 20, 20);
    }
}

function updateScore() {
    var score = player.getScore();
    //context.fillStyle = "#E39415";
    context.fillStyle = (score < 0) ? "red" : "white";
    context.font = "32px '8bitOperatorBold'";
    context.fillText(score, width - context.measureText(score).width - 20, 40);
}

function renderGameOverScreen() {
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'white';
    context.font = "72px '8bitOperatorBold'";
    context.fillText('Game Over!', (width / 2) - (context.measureText("Game Over!").width / 2), height / 2);
    context.font = "48px '8bitOperatorBold'";
    context.fillText('Score: ' + player.getScore(), (width / 2) - (context.measureText("Score: " + player.getScore()).width / 2), (height / 2) + 60);
}

function updateRoundInfo() {
    var text = "Round " + round;
    context.fillStyle = "white";
    context.font = "32px '8bitOperatorBold'";
    context.fillText(text, 20, height - 20);
}