// actions.js
'use strict';

var constants = require('./constants');


var actions = {
    cardClicked: function (cardIndex) {
        this.dispatch(constants.CARD_CLICKED, cardIndex);
    },

    newGame: function () {
        this.dispatch(constants.NEW_GAME);
    }
};

module.exports = actions;
