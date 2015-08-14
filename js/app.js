const React = require('react');
const Nav = require('./nav');
const sample1 = require('./sample1');
const treeView = require('./tree/tree-view');

const samples = [];
samples.push(sample1);
samples.push(treeView);

React.render(<Nav samples={samples}/>, document.getElementById("nav"));