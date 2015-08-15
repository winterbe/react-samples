const React = require('react');
const _ = require('lodash');

module.exports = React.createClass({
    render() {
        let options = this.props.samples.map((sample, i) => (
            <option value={i}>{sample.name}</option>
        ));

        return (
            <select defaultValue={this.state.sample} onChange={this.handleChange}>
                <option value="-1">Choose...</option>
                {options}
            </select>
        )
    },

    componentDidMount() {
        this.showSample(this.state.sample);
    },

    getInitialState() {
        let sample = localStorage.getItem("sample") || -1;
        return {sample};
    },

    handleChange(ev) {
        let i = _.parseInt(ev.target.value);
        this.showSample(i);
    },

    showSample(i) {
        var container = document.getElementById('content');
        React.unmountComponentAtNode(container);
        if (i > -1) {
            let component = this.props.samples[i].fn();
            React.render(component, container);
        }
        localStorage.setItem("sample", i);
    }
});