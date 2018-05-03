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
import Popup from "reactjs-popup";
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
    var orders_temp = [{address: "3147 Broadway Apt. 3", contents:"1 pizza"},{address: "18 St Nicholas Place Apt. 3B", contents:"2 pizza"},{address: "4510 5th Avenue", contents:"800 pizzas"}];
    this.state = {
      value: 1,
      enterOrigin: false,
      origin: '',
      destination: '',
      map: false,
      key: 0,
      ratingsOn: false,
      color: 'red',
      toBeDeleted: '',
      orders: orders_temp
    };
  }

  deleteRow(address){
    var update = this.state.orders;
    for(var i = 0; i < update.length; i++){
      if(update[i].address == address){
        update.splice(i,1)
      }
    }
    
    this.setState({
      orders: update,
    });

    console.log(this.state.orders)
    this.forceUpdate();
  }

  addOrder(order){
    var update = this.state.orders;
    update.push(order);
    this.setState({
      orders: update
    });
  }

  setToBeDeleted(address){
    this.setState({
      toBeDeleted: address
    })
  }

  getSelectedOrder(order){
    if(!this.state.map){
      this.setState({
        destination: order.address,
        map: true,
        color: 'blue'
      })
      this.forceUpdate();
      return true;
    }
    else{
      this.setState({
        destination: this.state.destination,
        map: false,
        color: 'red'
      })
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
        ratingsOn: false
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

  triggerRating(){
    this.complete(false);
    this.setState({
      ratingsOn: true
    })
    
  }

  //Handles rating once delivery rates the customer
  handleCustomerRating(value){
    this.setState({
      ratingsOn: false
    })
    this.complete(true);
    this.deleteRow(this.state.toBeDeleted)
    console.log(value);

  }

  handleCancel(){
    this.setState({
      ratingsOn: false,
      map: false,
      color: 'red'

    })
    this.forceUpdate();
  }

  render() {
    if(this.state.enterOrigin){
        return (
          <Tabs>
            <Tab label="Orders" style={{background: this.state.color}}>
              <div className = "container" >
                <center>
                  <Paper style={style.formStyle} zDepth={3}>
                    <h2>To Deliver</h2>
                    <div style={{border: '10px double white'}}>
                      <Popup  style={{width:'100px',height: '100px'}} open={this.state.ratingsOn}> 
                        <Ratings handleRating = {this.handleCustomerRating.bind(this)}/> 
                        <RaisedButton onClick = {this.handleCancel.bind(this)}> Cancel </RaisedButton>
                      </Popup>
                      <DeliveryTable  setToBeDeleted={this.setToBeDeleted.bind(this)} orders = {this.state.orders} getSelectedOrder={this.getSelectedOrder.bind(this)} triggerRating={this.triggerRating.bind(this)}/>
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
