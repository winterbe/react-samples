const React = require('react');

const Matrix = React.createClass({
    render() {
        return (
            <div className="numbers">
                {this.state.rows.map((row, i) =>
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
        let rows = [
            [1, 2, 3, 4, 5],
            [2, 3, 4, 5, 6],
            [3, 4, 5, 6, 7],
            [4, 5, 6, 7, 8],
            [5, 6, 7, 8, 9]
        ];
        return {rows};
    }
});

module.exports = {
    name: 'Matrix',
    fn: () => <Matrix/>
};