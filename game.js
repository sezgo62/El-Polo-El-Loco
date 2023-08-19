let canvas;
let world;
let keyboard = new Keyboard();
let gameMusic = new Audio('audio/levelMusic.mp3');
gameMusic.volume = 0.8;
let lockButton = document.getElementById('lock-landscape-button');



function startGame() {

    document.getElementById('startScreenImage').classList.add('d-none');
    document.getElementById('startScreenImageMobile').style.display = 'none';
    document.getElementById('startGameImage').classList.add('d-none');
    document.getElementById('how2play').classList.add('d-none');
    initLevel();
    init();
}


function playMusic() {
    // start the music
    gameMusic.play();
    // make the music loop continuously
    gameMusic.loop = true;
}


let source = "img/soundMute.png";
function muteSound() {
    if (source == "img/soundMute.png") {
        muteSoundandImage();
    } else {
        unmuteSoundAndImage();
    }
}


function unmuteSoundAndImage() {
    source = "img/soundMute.png";
    document.getElementById('soundMute').src = source;
    gameMusic.muted = false;
    muteAllSounds();
}


function muteSoundandImage() {
    source = "img/soundUnmute.png";
    document.getElementById('soundMute').src = source;
    gameMusic.muted = true;
    allSounds.forEach(sound => {
        sound.muted = true;
    });
}


function fullScreen() {
    let elem = document.getElementById('canvas');
    openFullscreen(elem);
}


function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('restart').classList.add('d-none');
}


function restart() {
    clearAllObjects()
    init();
    classlistForRestart();
    resetAllObjects();
    gameMusic.pause();
    gameMusic = new Audio('audio/levelMusic.mp3');
    gameMusic.play();
}

function gameOver() {
    classlistForGameOver();
    gameMusic.pause();
    stopIntervals();
    muteAllSounds();
}

function gameWin() {
    classliszForGameWin();
    gameMusic.pause();
    stopIntervals();
    muteAllSounds();
}

function closePopUp() {
    document.getElementById('closePopUp').classList.add('d-none');
    document.getElementById('helpPopUp').classList.add('d-none');
}

function openPopUp() {
    document.getElementById('closePopUp').classList.remove('d-none');
    document.getElementById('helpPopUp').classList.remove('d-none');
}


function muteAllSounds() {
    allSounds.forEach(sound => {
        sound.muted = true;
    });
}

function classliszForGameWin() {
    document.getElementById('canvas').classList.add('blur');
    document.getElementById('mexicanGuy').classList.remove('d-none');
    document.getElementById('winner').classList.remove('d-none');
    document.getElementById('fullScreenButton').classList.add('d-none');
    document.getElementById('restart').classList.remove('d-none');
}

function classlistForGameOver() {
    document.getElementById('canvas').classList.add('blur');
    document.getElementById('gameOver').classList.remove('d-none');
    document.getElementById('fullScreenButton').classList.add('d-none');
    document.getElementById('restart').classList.remove('d-none');
}

function classlistForRestart() {
    document.getElementById('restart').classList.add('d-none');
    document.getElementById('fullScreenButton').classList.remove('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('canvas').classList.remove('blur');
    document.getElementById('mexicanGuy').classList.add('d-none');
    document.getElementById('winner').classList.add('d-none');
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

bottlesAvailable = 1;

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


window.addEventListener('touchstart', (e) => {

    left();
    right();
    up();
    attack();
});





function left() {
    document.getElementById('arrowLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('arrowLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

function right() {
    document.getElementById('arrowRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('arrowRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function up() {
    document.getElementById('arrowUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('arrowUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function attack() {
    document.getElementById('arrowAttack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('arrowAttack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}