const React = require('react');

const Hello = React.createClass({
    render() {
        return (
            <div className="jumbotron">
                <h1>React Samples</h1>
                <p className="lead">
                    Welcome to my React.js Examples project.
                </p>
                <p>
                    Unix Time: {this.state.time}
                </p>
            </div>
        )
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