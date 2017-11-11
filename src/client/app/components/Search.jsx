import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({query: e.target.value});
  }

  onClick() {
    this.props.onClick(this.state.query);
  }

  render() {
    return (
      <div>
        Enter crypto query:<br />
        <input type="text" name="query" onChange={this.onChange} /><br />
        <button onClick={this.onClick}>Click me!</button>
      </div>
    );
  }
}

export default Search;