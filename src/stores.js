// store.js
'use strict';

var Fluxxor = require('fluxxor');
var Lodash = require('lodash');

var constants = require('./constants');


var GameStore = Fluxxor.createStore({
    initialize: function (options) {
        this.boardDimensions = {
            height: 4,
            width: 4 
        };

        // number of seconds that the color of the card is shown before it's
        // hidden
        this.cardFlipDelay = 500;

        this.bindActions(
            constants.CARD_CLICKED, Lodash.throttle(this.handleCardClick, this.cardFlipDelay),
            constants.NEW_GAME, this.handleNewGame
        );

        this.handleNewGame();
    },

    getState: function () {
        return {
            boardDimensions: this.boardDimensions,
            cards: this.cards,
            score: this.score
        };
    },

    getRandomHexColor: function () {
        // http://www.paulirish.com/2009/random-hex-color-code-snippets/
        return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
    },

    handleNewGame: function () {
        // All card colors are facing up by default to give the user a quick
        // glance at the board before they start playing and we then hide them.
        var hideCards = Lodash.bind(function () {
            Lodash.each(this.cards, function (card) {
                card.isColorFacingUp = false;
            });

            this.emit('change');
        }, this);

        this.cards = this.getCards();
        this.previousCardIndex = constants.SENTINAL;
        this.score = 0;

        setTimeout(hideCards, this.cardFlipDelay);

        this.emit('change');
    },

    getCards: function () {
        var cards = [];
        var numberOfPairs = this.boardDimensions.height * this.boardDimensions.width / 2;

        for (var i = 0; i < numberOfPairs; i++) {
            var card = {
                color: this.getRandomHexColor(),
                hasBeenMatched: false,
                isColorFacingUp: true
            };

            var clonedIndex = numberOfPairs + i;

            cards[i] = card;
            cards[clonedIndex] = Lodash.clone(card);
        }

        return Lodash.shuffle(cards);
    },

    handleCardClick: function (cardIndex) {
        var card = this.cards[cardIndex];
        var previousCard = this.cards[this.previousCardIndex];

        this.previousCardIndex = cardIndex;

        if ( ! card.hasBeenMatched && this.previousCardIndex !== cardIndex) {
            this.score++;
        }

        card.isColorFacingUp = true;

        // We don't care when someone clicks on a card that has already been
        // matched or when there isn't a previousCard to compare against.
        if ( ! card.hasBeenMatched && previousCard) {
            // They found a match
            if (card.color === previousCard.color) {
                card.hasBeenMatched = true;
                previousCard.hasBeenMatched = true;
                this.previousCardIndex = constants.SENTINAL;
            } else if (this.score % 2 === 0) {
                // modulo 0 indicates the user has two cards facing up.

                // At this point we know the two cards don't match so we
                // need to reset previousCard to a sentinal value so the
                // next card the user clicks on there is nothing to compare
                // against.
                this.previousCardIndex = constants.SENTINAL;

                // We can't immediately hide the cards or else the user
                // wouldn't get much of a chance to see that they picked an
                // incorrect one.
                var hideCards = Lodash.bind(function () {
                    card.isColorFacingUp = false;
                    previousCard.isColorFacingUp = false;
                    this.emit('change');
                }, this);

                setTimeout(hideCards, this.cardFlipDelay);
            }
        }

        this.emit('change');
    }
});

var stores = {
    GameStore: new GameStore()
};

module.exports = stores;
