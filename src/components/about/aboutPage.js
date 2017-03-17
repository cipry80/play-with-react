'use strict'
const React = require('react');

const About = React.createClass({
        render: function() {
            return (
                <div>
                    <h1>About</h1>
                    <p>This app use the following technologies:
                            <li>React</li>
                            <li>React Router</li>
                            <li>Flux</li>
                            <li>Node</li>
                            <li>Bootstrap</li>
                    </p>
                </div>
            );
        }
});

module.exports = About;
