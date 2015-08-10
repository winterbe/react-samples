const Hello = React.createClass({
    render() {
        return <h1>Hello React</h1>;
    }
});

nav.addSample("Sample 1", function () {
    return <Hello/>;
});