'use strict'
const React = require('react');

const Home = React.createClass({
    render: function() {
         return (
            <div className="jumbotron">
                <h1>Play with React</h1>
                <p>React, Router and Flux</p>
            </div>
        );
    }
});

module.exports = Home;
