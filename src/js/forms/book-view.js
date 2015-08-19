const React = require('react');
const _ = require('lodash');
const s = require("underscore.string");


const LinkPathMixin = {
    linkPath() {
        return {
            value: _.get(this.state, this.props.path),
            requestChange: value => {
                _.set(this.state, this.props.path, value);
                this.forceUpdate();
            }
        }
    }
};


const TextInput = React.createClass({
    mixins: [LinkPathMixin],

    getInitialState() {
        return this.props.data;
    },

    render() {
        return (
            <input type="text" valueLink={this.linkPath()}/>
        )
    }
});


const NumberInput = React.createClass({
    render() {
        let value = _.get(this.props.data, this.props.path);
        let formattedValue = this.formatNumber(value);
        return (
            <input type="text"
                   disabled={this.props.disabled}
                   defaultValue={formattedValue}
                   onChange={this.handleChange}
                   onBlur={this.handleBlur}/>
        )
    },

    getDefaultProps() {
        return {
            decimalDigits: 2
        }
    },

    componentDidUpdate() {
        let value = _.get(this.props.data, this.props.path);
        let formattedValue = this.formatNumber(value);
        var node = this.getDOMNode();
        node.value = formattedValue;
    },

    handleChange(ev) {
        let num = this.parseNumber(ev.target.value);
        var obj = this.props.data;
        var path = this.props.path;
        _.set(obj, path, num);
    },

    handleBlur(ev) {
        let num = this.parseNumber(ev.target.value);
        ev.target.value = this.formatNumber(num);
    },

    formatNumber(value) {
        return s.numberFormat(value, this.props.decimalDigits, ',', '.');
    },

    parseNumber(value) {
        if (_.isNumber(value)) {
            return value;
        }
        if (s.isBlank(value)) {
            return 0;
        }
        value = value.replace(/\./g, '');
        value = value.replace(/,/, '.');
        return parseFloat(value);
    }
});


const BookForm = React.createClass({
    render() {
        let book = this.props.book;

        return (
            <form>
                <h3>Book Details</h3>
                <label>
                    Title: <TextInput path="title" data={book}/>
                </label>
                <label>
                    ISBN: <TextInput path="isbn" data={book}/>
                </label>
                <label>
                    Price: <NumberInput path="price" data={book}/>
                </label>
                <h5>Authors</h5>
                {this.renderAuthors()}
                <button type="button" onClick={this.addAuthor}>
                    Add Author
                </button>
            </form>
        )
    },

    renderAuthors() {
        let book = this.props.book;
        let authors = book.authors;
        if (!authors || authors.length === 0) {
            return <div>No authors</div>;
        }
        return authors.map((author, i) => (
            <div key={`author${i}`}>
                <label>
                    Name:
                    <TextInput path={`authors[${i}].firstName`} data={book}/>
                    <TextInput path={`authors[${i}].lastName`} data={book}/>
                    <button type="button" onClick={this.removeAuthor.bind(this, i)}>
                        Remove
                    </button>
                </label>
            </div>
        ));
    },

    addAuthor() {
        this.props.book.authors.push({firstName: '', lastName: ''});
        this.forceUpdate();
    },

    removeAuthor(i) {
        this.props.book.authors.splice(i);
        this.forceUpdate();
    }
});

let book = {
    title: 'A Song of Ice and Fire',
    isbn: '978-0553593716',
    price: 6.99,
    authors: [{firstName: 'George R.R.', lastName: 'Martin'}]
};

module.exports = {
    name: 'Forms',
    fn: () => <BookForm book={book} />
};