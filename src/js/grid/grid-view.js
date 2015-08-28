const React = require('react');
const data = require('./grid-data');

const Grid = React.createClass({
    getInitialState() {
        let data = this.props.data;
        let dataView = this.createDataView(data);
        let columnDef = this.createColumnDef(data);
        return {dataView, columnDef};
    },

    createDataView(data) {
        if (!data || data.length === 0) {
            return [];
        }
        return data;
    },

    createColumnDef(data) {
        if (!data || data.length === 0) {
            return [];
        }
        let columnDef = [];
        let obj = data[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                columnDef.push({key});
            }
        }
        return columnDef;
    },

    render() {
        let columnDef = this.state.columnDef;
        let dataView = this.state.dataView;
        if (dataView.length === 0) {
            return <div className="text-muted">No data</div>
        }

        return (
            <table className="table">
                {this.renderHead(columnDef)}
                {this.renderBody(columnDef, dataView)}
            </table>
        )
    },

    renderHead(columnDef) {
        return (
            <thead>
            <tr>
                {columnDef.map((col, i) => (
                    <th key={`head-${i}`}>{col.key}</th>
                ))}
            </tr>
            </thead>
        )
    },

    renderBody(columnDef, dataView) {
        return (
            <tbody>
            {dataView.map((row, i) =>
                this.renderRow(row, i, columnDef))}
            </tbody>
        )
    },

    renderRow(row, i, columnDef) {
        return (
            <tr key={`row-${i}`}>
                {columnDef.map((def, j) => (
                    <td key={`col-${j}`}>
                        {row[def.key]}
                    </td>
                ))}
            </tr>
        )
    }
});

module.exports = {
    name: 'Grid',
    fn: () => <Grid data={data}/>
};