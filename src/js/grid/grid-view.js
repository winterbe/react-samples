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
        let filters = this.state.filter.split(' ');
        let dataView = data.filter(obj => {
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

        if (this.state.sort) {
            let sortKey = this.state.sort.key;
            let order = this.state.sort.desc ? -1 : 1;
            dataView.sort((o1, o2) => {
                let v1 = o1[sortKey];
                let v2 = o2[sortKey];
                let result = 0;
                if (v1 < v2) {
                    result = -1;
                }
                if (v1 > v2) {
                    result = 1;
                }
                return result * order;
            });
        }

        return dataView;
    },

    onFilterChange(filter) {
        filter = filter.toLowerCase();
        filter = filter.trim();
        this.setState({filter});
    },

    onSortChange(column) {
        let key = column.key;
        let desc = false;
        let currentSort = this.state.sort;
        if (currentSort && currentSort.key === key) {
            desc = !currentSort.desc;
        }
        this.setState({sort: {key, desc}});
    },

    render() {
        let columns = this.state.columns;
        let dataView = this.createDataView();
        return (
            <div className="grid">
                <Filter onChange={this.onFilterChange}/>
                <Table columns={columns}
                       dataView={dataView}
                       sort={this.state.sort}
                       onSortChange={this.onSortChange}/>
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
                {this.renderHead(this.props.columns, this.props.sort || {})}
                {this.renderBody(this.props.columns, this.props.dataView)}
            </table>
        )
    },

    handleSort(column) {
        this.props.onSortChange(column);
    },

    renderHead(columns, sort) {
        return (
            <thead>
            <tr>
                {columns.map((col, i) => (
                    <th onClick={this.handleSort.bind(this, col)}
                        className={sort.key == col.key ? 'sorted' : ''}
                        key={`head-${i}`}>
                        {col.key}
                    </th>
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