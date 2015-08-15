const EventEmitter = require('events').EventEmitter;
const Dispatcher = require('../dispatcher');
const TreeConstants = require('./tree-constants');
const assign = require('object-assign');

let items = [
    {text: 'Node 1', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]},
    {text: 'Node 2', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]},
    {text: 'Node 3', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]},
    {text: 'Node 4', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]},
    {text: 'Node 5', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]},
    {text: 'Node 6', children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]}
];

const TreeStore = assign({}, EventEmitter.prototype, {
    getItems() {
        return items;
    },

    addRootNode() {
        var num = items.length + 1;
        items.push({text: 'Node ' + num, children: [{text: 'Child 1'}, {text: 'Child 2'}, {text: 'Child 3'}]});
        this.emit('change');
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case TreeConstants.ADD_ROOT_NODE:
            TreeStore.addRootNode();
            break;
    }
});


module.exports = TreeStore;