const React = require('react');

const Hello = React.createClass({
    render() {
        return <h1>Hello React: {this.state.time}</h1>;
    },

    getInitialState() {
        return {
            time: Date.now(),
            delay: 150
        }
    },

    updateTime() {
        this.setState({
            time: Date.now()
        });
    },

    componentDidMount() {
        this.interval = setInterval(this.updateTime, this.state.delay);
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    }
});

module.exports = {
    name: 'Hello',
    fn: () => <Hello/>
};