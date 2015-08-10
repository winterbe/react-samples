"use strict";

var Hello = React.createClass({
    displayName: "Hello",

    render: function render() {
        return React.createElement(
            "h1",
            null,
            "Hello React"
        );
    }
});

nav.addSample("Sample 1", function () {
    return React.createElement(Hello, null);
});

//# sourceMappingURL=sample1-compiled.js.map