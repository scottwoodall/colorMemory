/** @jsx React.DOM */
/** components/Board.js **/
'use strict';

var Lodash = require('lodash');
var React = require('react');

var Card = require('./Card');


// Creates an html <table> based on the dimensions of the board
var Board = React.createClass({
    propTypes: {
        game: React.PropTypes.object.isRequired
    },

    getColumns: function (rowIndex) {
        var ret = [];
        var width = this.props.game.boardDimensions.width;
        var cardIndex = rowIndex * width;
        var columnIndex = cardIndex + width;
        var style = {
            borderTop: 'none',
        };

        for (cardIndex; cardIndex < columnIndex; cardIndex++) {
            var card = this.props.game.cards[cardIndex];

            ret.push(
                <td style={style} key={cardIndex}>
                    <Card index={cardIndex} card={card}/>
                </td>
            );
        }

        return ret;
    },

    getRows: function () {
        var ret = [];
        var height = this.props.game.boardDimensions.height;

        for (var i = 0; i < height; i++) {
            ret.push(
                <tr key={i}>
                    {this.getColumns(i)}
                </tr>
            );
        }

        return ret;
    },

    render: function () {
        return (
            <div className="well well-sm">
                <table className="table table-responsive table-condensed">
                    {this.getRows()}
                </table>
            </div>
        );
    }
});

module.exports = Board;
