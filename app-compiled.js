"use strict";

var Nav = React.createClass({
    displayName: "Nav",

    render: function render() {
        var options = this.state.samples.map(function (sample, i) {
            return React.createElement(
                "option",
                { value: i },
                sample.name
            );
        });

        return React.createElement(
            "select",
            { onChange: this.changeSample },
            React.createElement(
                "option",
                null,
                "Choose..."
            ),
            options
        );
    },

    getInitialState: function getInitialState() {
        return {
            samples: []
        };
    },

    addSample: function addSample(name, fn) {
        this.state.samples.push({ name: name, fn: fn });
        this.forceUpdate();
    },

    changeSample: function changeSample(ev) {
        console.log(ev);
    }
});

var nav = React.render(React.createElement(Nav, null), document.getElementById("nav"));

//# sourceMappingURL=app-compiled.js.map