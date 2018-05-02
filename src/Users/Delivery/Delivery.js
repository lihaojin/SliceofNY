import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import MapDelivery from './DeliveryMap/MapDelivery'
import DeliveryTable from './DeliveryMap/Map-Vehicles-React/src/components/DeliveryTable'
import Map from './DeliveryMap/Map-Vehicles-React/src/components/map'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import Ratings from '../../ratings/ratings'

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
      key: 0,
      ratingsOn: false,
      color: 'red'
    };
  }

  getSelectedOrder(order){
    if(!this.state.map || this.state.destination === order.address){
      this.setState({
        destination: order.address,
        map: true,
        color: 'blue'
      })
      this.forceUpdate();
      return true;
    }
    else{
      return false;
    }
  }

  complete(isComplete){
    if(isComplete){
      this.setState({
        map: false,
        color: 'red',
        key: this.state.key + 1,
        origin: this.state.destination,
        ratingsOn: true
     })
    }
    else{
      this.setState({
        map: false,
        key: this.state.key + 1,
        origin: this.state.origin,
        ratingsOn: false,
        color: 'red'

      })
    }

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

  handleCustomerRating(value){
    this.setState({
      ratingsOn: false
    })
    console.log(value);

  }

  render() {
    if(this.state.enterOrigin){
      if(true){
        return (
          <Tabs>
            <Tab label="Orders" style={{background: this.state.color}}>
              <div className = "container" >
                <center>
                  <Paper style={style.formStyle} zDepth={3}>
                    <h2>To Deliver</h2>
                    <div style={{border: '10px double white'}}>
                      <DeliveryTable  getSelectedOrder={this.getSelectedOrder.bind(this)} complete={this.complete.bind(this)}/>
                    </div>
                  </Paper>
                </center>
              </div>
            </Tab>
        {this.state.map && (
          <Tab label="Directions" style={{background: 'blue'}}>
            <div> {console.log(this.state.map)} </div>
            <Map key={this.state.key} origin={this.state.origin} destination={this.state.destination} />
          </Tab>)}
        </Tabs>
      );
    }
    else{
      return(
        <Ratings key={this.state.key} handleRating={this.handleCustomerRating.bind(this)}/>
      );
    }
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
      );
  }
}
}

export default Delivery;
