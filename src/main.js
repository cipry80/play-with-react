$ = jQuery = require('jquery');
const React = require('react');
const Home = require('./components/homePage');
const About = require('./components/about/aboutPage');
const Header = require('./components/common/header');


const App = React.createClass({
    render: function() {
        let Child;
        switch(this.props.route) {
            case 'about': Child = About;
            break;
            default: Child = Home;
        }
        return (
            <div>
                <Header/>
                <Child/>
            </div>
        );
    }
});

function render() {
    let route = window.location.hash.substr(1);
    React.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('haschange', render);
render();
