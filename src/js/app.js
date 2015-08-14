const React = require('react');
const Nav = require('./nav');

const samples = [];
samples.push(require('./hello/hello'));
samples.push(require('./tree/tree-view'));

React.render(<Nav samples={samples}/>, document.getElementById("nav"));