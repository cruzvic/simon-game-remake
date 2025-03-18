let userSequence = [];
let thisLevel = 1;
let sequence = [];
let isForcedClick = false;

function playAudio(key){
    switch (key) {
        case 'yellow':
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();
            break;
        case 'red':
            var audio = new Audio('sounds/red.mp3');
            audio.play();
            break;
        case 'green':
            var audio = new Audio('sounds/green.mp3');
            audio.play();
            break;
        case 'blue':
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
            break;
    
        default:
            break;
    }
};

function buttonClickAnimation (key) {
    $('.' + key).addClass("pressed");
    setTimeout(() => {
        $('.' + key).removeClass("pressed");
    }, 200);
};

// event listener for button click
$('.btn').click(function (e) {
    var key = this.classList[1];
    playAudio(key);
    buttonClickAnimation(key);
    if (!isForcedClick) {
        userSequence.push(e['target']['classList'][1]);
        console.log("user sequence: " + userSequence);
        console.log("game sequence: " + sequence);
        if (!checkAnswer(userSequence.length - 1)) {
            gameOver();
        }
    } else {
        isForcedClick = false;
    }
});

// event listener for game start
$(document).keydown(function (e) { 
    $("h1").text("Level " + thisLevel);
    gameStart();
    $(document).off("keydown");
});

function nextTile() {
    var next = Math.floor(Math.random() * 4);
    isForcedClick = true;
    switch (next) {
        case 0:
            $('.green').trigger('click');
            return 'green';
        
        case 1:
            $('.red').trigger('click');
            return 'red';
        
        case 2:
            $('.yellow').trigger('click');
            return 'yellow';
        
        case 3:
            $('.blue').trigger('click');
            return 'blue';
    
        default:
            break;
    }
}

function nextLevel() {
    userSequence = [];
    thisLevel++;
    $("h1").text("Level " + thisLevel);
    var next = nextTile();
    sequence.push(next);
}

function gameStart() {
    var correct = true;

    var current = nextTile();
    sequence.push(current);
}

function checkAnswer (currentLevel) {
    if (userSequence[currentLevel] == sequence[currentLevel]){
        console.log('Success!');
        if (userSequence.length === sequence.length) {
            setTimeout(nextLevel,1000);
        }
        return true;
    }
    else {
        console.log('Fail');
        return false;
    }
}

function gameOver() {
    userSequence = [];
    sequence = [];
    thisLevel = 1;
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");

    $(document).keydown(function (e) { 
        $("h1").text("Level " + thisLevel);
        gameStart();
        $(document).off("keydown");
    });
}