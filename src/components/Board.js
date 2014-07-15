/** @jsx React.DOM */
/** components/Board.js **/
'use strict';

var React = require('react/addons');

var constants = require('../constants');
var Card = require('./Card');


// Create an html <table> based on the dimensions of the board
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
            borderTop: 'none'
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

        for (var rowIndex = 0; rowIndex < height; rowIndex++) {
            ret.push(
                <tr key={rowIndex}>
                    {this.getColumns(rowIndex)}
                </tr>
            );
        }

        return ret;
    },

    render: function () {
        var smileyCss = React.addons.classSet({ 
            'fa': true,
            'fa-5x': true,
            'fa-meh-o': this.props.game.smileyFace === constants.MEH,
            'fa-frown-o': this.props.game.smileyFace === constants.FROWN,
            'fa-smile-o': this.props.game.smileyFace === constants.SMILE
        });

        return (
            <div className="well well-sm">
                <div className="text-center">
                    <i className={smileyCss}/>
                </div>

                <table className="table table-responsive table-condensed">
                    {this.getRows()}
                </table>
            </div>
        );
    }
});

module.exports = Board;
