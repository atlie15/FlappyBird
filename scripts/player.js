window.Player = (function() {
	'use strict';

	let Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.

	let SPEED = 30; // * 10 pixels per second
	const WIDTH = 6;
	const HEIGHT = 4.3;
	const INITIAL_POSITION_X = 30;
	const INITIAL_POSITION_Y = 25;

	let Player = function (el, game) {
        this.el = el;
        this.game = game;
        this.width = WIDTH;
        this.height = HEIGHT;
        this.pos = {x: 0, y: 0};
        this.bgPos = 0;
        this.lastFlap = false;
        this.lastJump = 0;
        this.rotate = 0;
    };

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
	    const time = (new Date() / 1000);

		if (this.pos.y < -HEIGHT)
		    this.pos.y = -HEIGHT;

        if ((time - this.lastJump) > 0.2) {
            this.rotate = 25;
            SPEED = 30;
        }

        if ((time - this.lastJump) > 1) {
            this.rotate = 75;
        }

		if( Controls.keys.space ) {
		    this.rotate = -25;
		    if ((time - this.lastJump) > 0.3)
                this.game.soundEffect(2);
			SPEED = -30;
			this.lastJump = new Date() / 1000;
		}

		if(this.game.isPlaying) {
			this.pos.y += delta * SPEED;
		}

		this.updateModel(time);
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.rotate + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.game.checkTubes(this.pos) || this.game.checkGround(this.pos.y + HEIGHT))
		{
		    this.game.soundEffect(1);
			return this.game.gameover();
		}
	};

	Player.prototype.updateModel = function (time) {

	    if (time - this.lastFlap > 0.1)
        {
            this.lastFlap = time;

            if (this.bgPos === -12)
                this.bgPos = 0;
            else
                this.bgPos -= 6;

            this.el.css('background-position', this.bgPos + 'em 0em' );
        }

    };

	return Player;

})();
