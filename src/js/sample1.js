const React = require('react');

const Hello = React.createClass({
    render() {
        return <h1>Sample 1</h1>;
    }
});

module.exports = {
    name: 'Sample 1',
    fn: () => <Hello/>
};