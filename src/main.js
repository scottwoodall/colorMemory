/** @jsx React.DOM */
/** main.js **/
'use strict';

var Fluxxor = require('fluxxor');
var React = require('react');

var actions = require('./actions');
var Game = require('./components/Game');
var stores = require('./stores');

var flux = new Fluxxor.Flux(stores, actions);

// Export React to the window object to make React DevTools available
window.React = React;

React.renderComponent(<Game flux={flux}/>, document.body);
