import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import MapDelivery from './DeliveryMap/MapDelivery'
import DeliveryTable from './DeliveryMap/Map-Vehicles-React/src/components/DeliveryTable'
import Map from './DeliveryMap/Map-Vehicles-React/src/components/map'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

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
}

const style_textField = {
      display: 'inline-block',
      height: {flex:1},
      width: {flex:2},
      margin: 20,
      padding: 40,
      textAlign: 'center',
      backgroundColor:'rgba(20,20,20,0.7)',
      floatingLabelStyle: {
        color: 'white',
      },
      floatingLabelFocusStyle: {
        color: 'white',
      },
      inputStyle:{
        color: 'white',
      }
    }

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
    if(this.state.origin != ''){
      this.setState({
        enterOrigin: true
      })
    }
    else{
      alert('Enter valid address')
    }
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
    {this.state.map && (
    <Tab label="Directions" style={{background: 'blue'}}>
    <Map key={this.state.key} origin={this.state.origin} destination={this.state.destination} />
    </Tab>)}
      </Tabs>
    );
  }
  else{
    return(
      <div className = 'container'>
      <TextField
      value={this.state.origin}
      name="originAddress"
      onChange={this.handleChangeOrigin.bind(this)}
      floatingLabelText="Origin"
      type="text"
      floatingLabelStyle ={style_textField.floatingLabelStyle}
      floatingLabelFocusStyle={style_textField.floatingLabelFocusStyle}
      inputStyle={style_textField.inputStyle}
    />
        
        <RaisedButton style={{height:'20px'}} onClick={this.handleSubmit.bind(this)}> Submit </RaisedButton>
      </div>
      )
  }
}
}

export default Delivery;
