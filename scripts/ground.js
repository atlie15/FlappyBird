window.Ground = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.

    const GROUND_HEIGHT = 10;

    let Ground = function (el, game) {
        this.height = GROUND_HEIGHT;
        this.el = el;
        this.game = game;
        this.pos = {x: 0, y: 0};
    };

    /**
     * Resets the state of the player for a new game.
     */
    Ground.prototype.reset = function() {
        this.pos.x = 0;
    };

    Ground.prototype.onFrame = function() {
        if (this.pos.x < -4.6)
            this.reset();
        else
            this.pos.x -= this.game.WORLD_SPEED;

        // Update UI
        this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Ground;
})();
