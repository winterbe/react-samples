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
            <div className="mrow" key={i}>
                {row.map((cell, j) => this.renderCell(cell, i, j))}
            </div>
        )
    },

    renderCell(cell, i, j) {
        let className = 'mcell';
        if (cell > 90) {
            className += ' hi';
        } else if (cell < 30) {
            className += ' lo';
        }
        return (
            <span className={className} key={`${i}_${j}`}>
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
                row.push(this.random(100));
            }
            matrix.push(row);
        }
        return {matrix};
    },

    componentDidMount() {
        this.interval = setInterval(this.updateMatrix, this.props.delay)
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    updateMatrix() {
        let row = this.state.matrix[this.random(this.props.size) - 1];
        row[this.random(row.length) - 1] = this.random(100);
        this.forceUpdate();
    },

    random(max) {
        return Math.floor(Math.random() * max) + 1;
    }
});

module.exports = {
    name: 'Matrix',
    fn: () => <Matrix size={12} delay={15}/>
};