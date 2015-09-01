const React = require('react');
const _ = require('lodash');

const Nav = React.createClass({
    render() {
        let items = this.props.samples.map((sample, i) => {
            let className = "";
            if (this.state.sample == i) {
                className = 'active';
            }
            return (
                <li role="presentation" className={className} key={i}>
                    <a href="#" onClick={this.showSample.bind(this, i)}>{sample.name}</a>
                </li>
            )
        });
        return <ul className="nav nav-pills pull-right">{items}</ul>;
    },

    componentDidMount() {
        this.showSample(this.state.sample);
    },

    getInitialState() {
        let sample = localStorage.getItem("sample") || 0;
        return {sample};
    },

    showSample(i) {
        var container = document.getElementById('content');
        React.unmountComponentAtNode(container);
        if (i > -1) {
            let component = this.props.samples[i].fn();
            React.render(component, container);
        }
        localStorage.setItem("sample", i);
        this.setState({sample: i});
    }
});

module.exports = Nav;