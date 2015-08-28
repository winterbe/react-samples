const React = require('react');
const data = require('./grid-data');

const Grid = React.createClass({
    getInitialState() {
        let filter = '';
        let columns = this.createColumns(this.props.data);
        return {columns, filter};
    },

    createColumns(data) {
        if (!data || data.length === 0) {
            return [];
        }
        let columns = [];
        let obj = data[0];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                columns.push({key});
            }
        }
        return columns;
    },

    createDataView() {
        let data = this.props.data;
        if (!data || data.length === 0) {
            return [];
        }
        let filter = this.state.filter;
        if (!filter) {
            return data;
        }
        let filters = filter.split(' ');
        return data.filter(obj => {
            for (let i = 0; i < filters.length; i++) {
                let filter = filters[i];
                let found = false;
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let value = String(obj[key]).toLowerCase();
                        if (value.indexOf(filter) >= 0) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    return false;
                }
            }
            return true;
        });
    },

    onFilterChange(filter) {
        filter = filter.toLowerCase();
        filter = filter.trim();
        this.setState({filter});
    },

    render() {
        let columns = this.state.columns;
        let dataView = this.createDataView();
        return (
            <div className="grid">
                <Filter onChange={this.onFilterChange}/>
                <Table columns={columns} dataView={dataView}/>
            </div>
        )
    }
});

const Filter = React.createClass({
    render() {
        return (
            <div className="input-group input-group-sm" style={{marginBottom: 15}}>
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-search"></span>
                </span>
                <input ref="input" type="text" className="form-control" placeholder="Filter..." onChange={this.handleInput}/>
            </div>
        )
    },

    handleInput(ev) {
        let term = ev.target.value;
        this.props.onChange(term);
    },

    componentDidMount() {
        React.findDOMNode(this.refs.input).focus();
    }
});

const Table = React.createClass({
    render() {
        let dataView = this.props.dataView;
        if (!dataView || dataView.length === 0) {
            return <div className="text-muted">No data</div>;
        }
        return (
            <table className="table table-striped">
                {this.renderHead(this.props.columns)}
                {this.renderBody(this.props.columns, this.props.dataView)}
            </table>
        )
    },

    renderHead(columns) {
        return (
            <thead>
            <tr>
                {columns.map((col, i) => (
                    <th key={`head-${i}`}>{col.key}</th>
                ))}
            </tr>
            </thead>
        )
    },

    renderBody(columns, dataView) {
        return (
            <tbody>
            {dataView.map((row, i) =>
                this.renderRow(row, i, columns))}
            </tbody>
        )
    },

    renderRow(row, i, columns) {
        return (
            <tr key={`row-${i}`}>
                {columns.map((def, j) => (
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