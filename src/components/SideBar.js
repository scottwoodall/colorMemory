/** @jsx React.DOM */
/** components/SideBar.js **/
'use strict';

var Fluxxor = require('fluxxor');
var Lodash = require('lodash');
var React = require('react');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);


var SideBar = React.createClass({
    mixins: [FluxChildMixin],

    propTypes: {
        game: React.PropTypes.object.isRequired
    },

    handleNewGameClick: function (evnt) {
        this.getFlux().actions.newGame();
    },

    render: function () {
        return (
            <div className="well well-sm">
                <h2 className="text-center">Score: {this.props.game.score}</h2>

                <button className="btn btn-info btn-block"
                        onClick={this.handleNewGameClick}>
                    New Game
                </button>

                <hr/>

                <h4>Rules:</h4>
                <ol>
                    <li>Click a square and try to find the matching color.</li>
                    <li>Every click increases your score (lower is better).</li>
                </ol>
            </div>
        );
    }
});

module.exports = SideBar;
