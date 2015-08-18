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
            </form>
        )
    }
});

let book = {
    title: 'A Song of Ice and Fire',
    isbn: '978-0553593716',
    price: 6.99
};

module.exports = {
    name: 'Forms',
    fn: () => <BookForm book={book} />
};