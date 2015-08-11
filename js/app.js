const React = require('react');
const Nav = require('./nav');
const sample1 = require('./sample1');
const sample2 = require('./sample2');

const samples = [];
samples.push(sample1);
samples.push(sample2);

React.render(<Nav samples={samples}/>, document.getElementById("nav"));