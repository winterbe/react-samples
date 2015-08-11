const React = require('react');
const _ = require('lodash');

module.exports = React.createClass({
    render() {
        let options = this.props.samples.map((sample, i) => (
            <option value={i}>{sample.name}</option>
        ));

        return (
            <select onChange={this.changeSample}>
                <option value="-1">Choose...</option>
                {options}
            </select>
        )
    },

    changeSample(ev) {
        var container = document.getElementById('content');
        React.unmountComponentAtNode(container);
        let i = _.parseInt(ev.target.value);
        if (i > -1) {
            let component = this.props.samples[i].fn();
            React.render(component, container);
        }
    }
});