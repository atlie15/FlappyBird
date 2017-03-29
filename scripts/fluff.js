window.Fluff = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    const WIDTH = 11.1;

    let Fluff = function(el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: -WIDTH, y: 0};
    };

    /**
     * Resets the state of the player for a new game.
     */
    Fluff.prototype.reset = function() {
        this.pos.x = -WIDTH;
    };

    Fluff.prototype.onFrame = function() {
        if (this.pos.x > this.game.WORLD_WIDTH)
            this.reset();
        else
            this.pos.x += this.game.WORLD_SPEED/2;

        // Update UI
        this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Fluff;

})();
