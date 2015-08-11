const React = require('react');

const Hello = React.createClass({
    render() {
        return <h1>Sample 2</h1>;
    }
});

module.exports = {
    name: 'Sample 2',
    fn: () => <Hello/>
};