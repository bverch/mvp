import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class ResultEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100',
      height: '100',
      data: [{name: 'Pt1', uv: 200}, {name: 'Pt2', uv: 300}],
      options: null
    }
    // this._chart = new Chart(this.refs.canvas.getDOMNode().getContext("2d")).Line(this.state.data, this.state.options);
  }
  render() {
    return (
      <div>
        <LineChart width={500} height={200} data={this.props.coin.map((coin)=>{return {name: '' + new Date(coin.date).getHours() + ':' + new Date(coin.date).getMinutes() + ':' + new Date(coin.date).getSeconds(), uv: coin.price_usd}})} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis domain={["dataMin", "dataMax"]}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
        <button>Set Threshold</button>
        {this.props.coin.name}{this.props.coin.price_usd}<br/>
      </div>
    );
  }
}

export default ResultEntry;