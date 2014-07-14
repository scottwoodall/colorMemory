/** @jsx React.DOM */
/** components/Game.js **/
'use strict';

var Fluxxor = require('fluxxor');
var React = require('react');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Board = require('./Board');
var NavBar = require('./NavBar');
var SideBar = require('./SideBar');


var Game = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('GameStore')],

    getStateFromFlux: function () {
        return {
            gameStore: this.getFlux().store('GameStore').getState()
        };
    },

    render: function () {
        return (
            <div className="container">
                <NavBar/>
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <SideBar game={this.state.gameStore}/>
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        <Board game={this.state.gameStore}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Game;
