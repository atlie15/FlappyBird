
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */

	let Game = function(el) {
		this.el = el;
        this.fluff = new window.Fluff(this.el.find('.Fluff'), this);
        this.ground = new window.Ground(this.el.find('.Ground'), this);
        this.tubes = new window.Tubes(this.el.find('.Tubes'), this);
        this.player = new window.Player(this.el.find('.Player'), this);
		this.isPlaying = false;
		this.canGiveScore = true;
		this.score = 0;
		this.highscore = 0;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
        this.fluff.onFrame();
        this.ground.onFrame();
        this.tubes.onFrame();
        this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
        this.tubes.init();
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		runGameScore.innerHTML = this.score;
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
        this.ground.reset();
        this.tubes.reset(1);
        this.tubes.reset(2);
        this.tubes.reset(3);
        this.player.reset();
		this.canGiveScore = true;
		this.score = 0;
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.tubes.stop();

		// Insert score to html

		if(this.score > this.highscore) {
			this.highscore = this.score;
			showScore.innerHTML = this.score;
			showHighscore.innerHTML = "NEW BEST: " + this.highscore
		}
		else {
			showScore.innerHTML = this.score;
			showHighscore.innerHTML = this.highscore
		}


		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	Game.prototype.checkGround = function (posY) {
        return posY + this.ground.height >= this.WORLD_HEIGHT;
    };

    Game.prototype.checkTubes = function (birdPos) {
        const tubeSets = this.tubes.getPos();
        const tubeWidth = this.tubes.width;
        const tubeHeight = this.tubes.height;
        const birdWidth = this.player.width;
        const birdHeight = this.player.height;
        let collides = false;

        for(let tubeSet of tubeSets) {
            const tubeX = tubeSet.tube_down.pos.x;
            if ( (birdPos.x > tubeX - tubeWidth) && (birdPos.x - birdWidth < tubeX) )
            {
                const tubeD = tubeSet.tube_down.pos.y;
                const tubeU = tubeSet.tube_up.pos.y;

				if (this.canGiveScore && birdPos.x > tubeX) {
					this.canGiveScore = false;
                    runGameScore.innerHTML = ++this.score;
				}

                if ((birdPos.y + birdHeight > tubeU) || (birdPos.y < tubeD + tubeHeight))
                {
                    collides = true;
                }
            }

			if ( (birdPos.x > tubeX + birdWidth) && (birdPos.x < tubeX + 2*birdWidth) ){
				this.canGiveScore = true;
			}

        }

        return collides;
    };

    Game.prototype.soundEffect = function (type) {
		if(soundMuted === true) {
			return;
		}

        let effect;
        switch (type){
            case 1:
                effect = new Audio("sounds/splash.wav");
                effect.play();
				effect.volume = 0.02;
                break;
            case 2:
               	effect = new Audio("sounds/flap.wav");
                effect.play();
				effect.volume = 0.4;
                break;


        }

    };

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.WORLD_SPEED = 0.2;

	return Game;
})();


