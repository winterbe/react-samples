const Nav = React.createClass({
    render() {
        let options = this.state.samples.map((sample, i) => (
            <option value={i}>{sample.name}</option>
        ));

        return (
            <select onChange={this.changeSample}>
                <option>Choose...</option>
                {options}
            </select>
        )
    },

    getInitialState() {
        return {
            samples: []
        };
    },

    addSample(name, fn) {
        this.state.samples.push({name, fn});
        this.forceUpdate();
    },

    changeSample(ev) {
        console.log(ev);
    }
});

const nav = React.render(<Nav/>, document.getElementById("nav"));