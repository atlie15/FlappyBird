
/**
 * Bootstrap and start the game.
 */
let soundMuted = false;

$(function () {
    'use strict';

    let audio = document.getElementById("playMusic");
    audio.play();
    audio.volume = 0.03;

    let game = new window.Game($('.GameCanvas'));
    game.start();
});

$('#Music').click(function () {
    let audio = document.getElementById("playMusic");
    let picture = document.getElementById("Music");

    if (audio.paused) {
        audio.play();
        audio.volume = 0.03;
        picture.src='../images/musicOn.png';
        soundMuted = false;
    }
    else {
        audio.pause();
        audio.currentTime = 0;
        picture.src='../images/musicOff.png';
        soundMuted = true;
    }

});
