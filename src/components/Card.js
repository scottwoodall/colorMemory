/** @jsx React.DOM */
/** components/Card.js **/
'use strict';

var Fluxxor = require('fluxxor');
var React = require('react');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);


var Card = React.createClass({
    mixins: [FluxChildMixin],

    propTypes: {
        card: React.PropTypes.object.isRequired
    },

    handleClick: function () {
        this.getFlux().actions.cardClicked(this.props.index);
    },

    render: function () {
        var style = {
            height: '130px',
            width: '130px'
        };

        if (this.props.card.isColorFacingUp) {
            style['backgroundColor'] = this.props.card.color;
        }

        return (
            <img onClick={this.handleClick} style={style}
                className="img center-block img-thumbnail img-responsive"/>
        );
    }
});

module.exports = Card;
