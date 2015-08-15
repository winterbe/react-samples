const React = require('react');

const Matrix = React.createClass({
    render() {
        return (
            <div className="matrix">
                {this.state.matrix.map((row, i) =>
                    this.renderRow(row, i))}
            </div>
        )
    },

    renderRow(row, i) {
        return (
            <div className="row" key={i}>
                {row.map((cell, j) => this.renderCell(cell, i, j))}
            </div>
        )
    },

    renderCell(cell, i, j) {
        return (
            <span className="cell" key={`${i}_${j}`}>
                {cell}
            </span>
        )
    },

    getInitialState() {
        let matrix = [];
        var size = this.props.size;
        for (var i = 0; i < size; i++) {
            let row = [];
            for (var j = 0; j < size; j++) {
                row.push(j);
            }
            matrix.push(row);
        }
        return {matrix};
    }
});

module.exports = {
    name: 'Matrix',
    fn: () => <Matrix size={20}/>
};