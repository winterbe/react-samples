# [React](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

React.js Examples
========================

This repo contains a bunch of React.js examples. No server side code, just client-side React components. 

### [Live Demo](http://winterbe.com/projects/react-samples/)

### Getting started

> Make sure you have NPM and Webpack installed before getting started.

* Install: `npm install`
* Build: `webpack --watch`
* Start: `open src/index.html`

### Create new samples

* Fork this repo
* Create a sample module, e.g. `src/js/mysample/mysample-view.js`. Your module must export a descriptor like that:

```js
module.exports = {
    name: 'My Sample',
    fn: () => <MySample/>
};
```

* Add your sample to `src/js/app.js` by adding: `samples.push(require('./mysample/mysample-view'));`

### License

MIT
