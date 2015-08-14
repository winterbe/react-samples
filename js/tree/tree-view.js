const React = require('react');
const TreeActions = require('./tree-actions');
const TreeStore = require('./tree-store');

const Tree = React.createClass({
    render() {
        return (
            <div className="tree">
                <ActionBar />
                <NodeList items={this.state.items}/>
            </div>
        )
    },

    componentDidMount() {
        TreeStore.on('change', () => {
            this.setState({items: TreeStore.getItems()});
        });
    },

    getInitialState() {
        return {
            items: this.props.items || []
        }
    }
});

const ActionBar = React.createClass({
    render() {
        return (
            <div className="actions">
                <button onClick={this.handleAddNode}>
                    Add Node
                </button>
            </div>
        )
    },

    handleAddNode() {
        TreeActions.addRootNode();
    }
});

const NodeList = React.createClass({
    render() {
        let elements = this.props.items.map((item, i) => (
            <Node item={item} key={item.id || i}/>
        ));

        return (
            <ul className='node-list'>
                {elements}
            </ul>
        )
    }
});

const Node = React.createClass({
    render() {
        let elements;
        let className = "node";
        let children = this.props.item.children || [];
        if (this.state.expanded && children.length > 0) {
            className += ' expanded';
            elements = <NodeList items={children}/>
        }
        if (children.length === 0) {
            className += ' leaf';
        }

        return (
            <li className={className}>
                <span className="node-label" onClick={this.handleClick}>
                    {this.props.item.text}
                </span>
                {elements}
            </li>
        )
    },

    getInitialState() {
        return {
            expanded: false
        }
    },

    handleClick() {
        this.setState({
            expanded: !this.state.expanded
        });
    }
});

module.exports = {
    name: 'Tree',
    fn: () => <Tree items={TreeStore.getItems()}/>
};