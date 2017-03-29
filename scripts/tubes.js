window.Tubes = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.

    const WIDTH = 5.2;
    const HEIGHT = 32;

    let Tubes = function (el, game) {
        this.el = el;
        this.game = game;
        this.width = WIDTH;
        this.height = HEIGHT;

        this.tubeset_1 = {
            tube_down: new window.Tube(this.el.find('.Tube_1 .tube_down'), this.game, true, this.width, this.height),
            tube_up: new window.Tube(this.el.find('.Tube_1 .tube_up'), this.game, false, this.width, this.height),
            active: false
        };
        this.tubeset_2 = {
            tube_down: new window.Tube(this.el.find('.Tube_2 .tube_down'), this.game, true, this.width, this.height),
            tube_up: new window.Tube(this.el.find('.Tube_2 .tube_up'), this.game, false, this.width, this.height),
            active: false
        };
        this.tubeset_3 = {
            tube_down: new window.Tube(this.el.find('.Tube_3 .tube_down'), this.game, true, this.width, this.height),
            tube_up: new window.Tube(this.el.find('.Tube_3 .tube_up'), this.game, false, this.width, this.height),
            active: false
        };
    };

    /**
     * Resets the state of the player for a new game.
     */
    Tubes.prototype.reset = function(pipeNo) {
        /* -12 to 2 */
        const offset = Math.floor(Math.random() * 14) -12;

        switch (pipeNo){
            case 1:
                this.tubeset_1.tube_down.reset(offset);
                this.tubeset_1.tube_up.reset(offset);
                break;
            case 2:
                this.tubeset_2.tube_down.reset(offset);
                this.tubeset_2.tube_up.reset(offset);
                break;
            case 3:
                this.tubeset_3.tube_down.reset(offset);
                this.tubeset_3.tube_up.reset(offset);
        }
    };

    Tubes.prototype.onFrame = function(delta) {
        if (this.game.WORLD_WIDTH - this.tubeset_1.tube_down.pos.x > 35.5)
            this.tubeset_2.active = true;
        if (this.game.WORLD_WIDTH - this.tubeset_2.tube_down.pos.x > 35.5)
            this.tubeset_3.active = true;

        if (this.tubeset_1.tube_down.pos.x < 0 - this.width)
            this.reset(1);
        else if (this.tubeset_1.active)
        {
            this.tubeset_1.tube_down.onFrame(delta);
            this.tubeset_1.tube_up.onFrame(delta);
        }

        if (this.tubeset_2.tube_down.pos.x < 0 - this.width)
            this.reset(2);
        else if (this.tubeset_2.active)
        {
            this.tubeset_2.tube_down.onFrame(delta);
            this.tubeset_2.tube_up.onFrame(delta);
        }

        if (this.tubeset_3.tube_down.pos.x < 0 - this.width)
            this.reset(3);
        else if (this.tubeset_3.active)
        {
            this.tubeset_3.tube_down.onFrame(delta);
            this.tubeset_3.tube_up.onFrame(delta);
        }
    };

    Tubes.prototype.getPos = function () {
        return [
            this.tubeset_1,
            this.tubeset_2,
            this.tubeset_3
        ];
    };

    Tubes.prototype.init = function () {
        this.tubeset_1.active = true;
    };

    Tubes.prototype.stop = function () {
        this.tubeset_1.active = false;
        this.tubeset_2.active = false;
        this.tubeset_3.active = false;
    };

    return Tubes;

})();
