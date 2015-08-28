const React = require('react');
const Nav = require('./nav');

const samples = [];
samples.push(require('./hello/hello'));
samples.push(require('./matrix/matrix'));
samples.push(require('./forms/book-view'));
samples.push(require('./tree/tree-view'));
samples.push(require('./grid/grid-view'));

React.render(<Nav samples={samples}/>, document.getElementById("nav"));