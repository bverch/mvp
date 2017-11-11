import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search.jsx';
import Results from './components/Results.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
    this.onClick = this.onClick.bind(this);
    this.startGraphLoop = this.startGraphLoop.bind(this);
  }
  onClick(query) {
    console.log('App received query: ' + query);
    var sendQuery = () => {
        $.ajax({
          context: this,
          type: 'POST',
          url: '/query',
          data: query
        }).done((results) => {
          console.log('Received from server: ', results);
          this.startGraphLoop();
          // this.setState({coins: results});
        }).fail((err)=> {
          console.log('Error: ', err);
        });
    }
    sendQuery();
    if (!this.state.coins[query]) {
      setInterval(sendQuery, 10000);
    }
    // request('localhost:3000', function (error, response, body) {
    //   console.log('error:', error);
    //   console.log('statusCode:', response);
    //   console.log('body:', body);
    // });
  }
  startGraphLoop() {
    var sendQuery = () => {
      $.ajax({
        context: this,
        type: 'GET',
        url: '/query'
      }).done((results)=> {
        console.log('Get request returned: ', results);
        this.setState({coins: results});
      });
    }
    sendQuery();
  }
  render () {
    return (
      <div>
        <Search onClick={this.onClick}/>
        <Results coins={this.state.coins}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));