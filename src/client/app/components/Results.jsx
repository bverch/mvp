import React from 'react';
import ResultEntry from './ResultEntry.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  // onChange(e) {
  //   this.setState({query: e.target.value});
  // }

  // onClick() {
  //   console.log('CLICKED!', this.state.query);
  // }

  render() {
    return (
      <div>
        Coins length is: {this.props.coins.length}
        {this.props.coins.map((coin, index)=><ResultEntry coin={coin.reverse()} key={index}/>)}
      </div>
    );
  }
}

export default Results;