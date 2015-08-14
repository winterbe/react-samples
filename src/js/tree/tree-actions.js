const Dispatcher = require('../app-dispatcher');
const TreeConstants = require('./tree-constants');

module.exports = {
    addRootNode() {
        Dispatcher.dispatch({
            actionType: TreeConstants.ADD_ROOT_NODE
        });
    }
};