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
