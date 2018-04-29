import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import MapDelivery from './DeliveryMap/MapDelivery'
import DeliveryTable from './DeliveryMap/Map-Vehicles-React/src/components/DeliveryTable'
import Map from './DeliveryMap/Map-Vehicles-React/src/components/map'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  formStyle: {
  display: 'inline-block',
  height: {flex:1},
  width: {flex:2},
  margin: 20,
  padding: 40,
  textAlign: 'center',
  backgroundColor:'rgba(20,20,20,0.7)'
  },

};

class Delivery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      enterOrigin: false,
      origin: '',
      destination: '',
      map: false,
      color: 'blue',
      key: 0
    };
  }

  getSelectedOrder(order){
    this.setState({
      destination: order.address,
      map: true,
      color: 'green'
    })
    this.forceUpdate();
  }

  complete(){
    this.setState({
      map: false,
      key: this.state.key + 1,
      color: 'blue',
      origin: this.state.destination
    })

    this.forceUpdate();
  }

  handleChange = (event, index, value) => this.setState({value});

  handleSubmit(){
    this.setState({
      enterOrigin: true
    })

    this.forceUpdate()
  }

  handleChangeOrigin(event){
    const value = event.target.value;
    this.setState({
      origin: value
    })
  }

  render() {
    if(this.state.enterOrigin){
    return (
      <Tabs>
      <Tab label="Orders" style={{background: 'blue'}}>
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>
    <h2>To Deliver</h2>
    <DeliveryTable  getSelectedOrder={this.getSelectedOrder.bind(this)} complete={this.complete.bind(this)}/>
    </Paper>
    </center>
    </div>
    </Tab>

    <Tab label="Directions" style={{background: this.state.color}}>
    {this.state.map && (<Map key={this.state.key} origin={this.state.origin} destination={this.state.destination} />)}
    </Tab>
      </Tabs>
    );
  }
  else{
    return(
      <div className = 'container'>
      <h1 style={{color: "white"}}>Enter Origin:</h1>
      <form>
        <input type='text' name='originAddress' value={this.state.origin} onChange={this.handleChangeOrigin.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}> Submit </button>
      </form>
      </div>
      )
  }
}
}

export default Delivery;
