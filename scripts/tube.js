window.Tube = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.

    const INITIAL_POSITION_Y = 40;

    let Tube = function (el, game, dir, width, height) {
        this.el = el;
        this.game = game;
        this.dir = dir;
        this.width = width;
        this.height = height;
        this.pos = {x: 0, y: 0};
    };

    /**
     * Resets the state of the player for a new game.
     */
    Tube.prototype.reset = function(offset) {
        if (this.dir)
        {
            this.pos.x = this.game.WORLD_WIDTH;
            this.pos.y = -15 + offset;
        }
        else
        {
            this.pos.x = this.game.WORLD_WIDTH;
            this.pos.y = INITIAL_POSITION_Y + offset;
        }
        this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Tube.prototype.onFrame = function() {
        this.pos.x -= this.game.WORLD_SPEED;

        // Update UI
        this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Tube;

})();
