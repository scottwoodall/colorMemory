/** @jsx React.DOM */
/** components/NavBar.js **/
'use strict';

var React = require('react');


var NavBar = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">
                            Color Memory
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="https://github.com/scottwoodall/colorMemory">
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = NavBar;
