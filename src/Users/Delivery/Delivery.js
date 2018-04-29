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
      destination: '',
      map: false,
      key: 0
    };
  }

  getSelectedOrder(order){
    this.setState({
      destination: order.address,
      map: true
    })
    this.forceUpdate();
  }

  complete(){
    this.setState({
      map: false,
      key: this.state.key + 1
    })

    this.forceUpdate();
  }
handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Tabs>
      <Tab label="Employees">
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>
    <h2>To Deliver</h2>
    <DeliveryTable  getSelectedOrder={this.getSelectedOrder.bind(this)} complete={this.complete.bind(this)}/>
    </Paper>
    </center>
    </div>
    </Tab>

    <Tab label="Directions">
    {this.state.map && (<Map key={this.state.key} origin="114 Bellair Drive" destination={this.state.destination} />)}
    </Tab>
      </Tabs>
    );
  }
}

export default Delivery;
