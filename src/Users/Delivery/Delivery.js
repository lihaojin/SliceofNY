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
import axios from 'axios'
import Geocode from "react-geocode";
import geolib from 'geolib'
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


const baseURL = 'http://localhost:3001/'

class Delivery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      enterOrigin: false,
      sentTexts: false,
      origin: '',
      destination: '',
      map: false,
      key: 0,
      ratingsOn: false,
      color: 'red',
      toBeDeleted: '',
      orders: [],
      alreadySelected: false
    };
  }



  componentDidMount(){
    axios.get(baseURL + 'delivery/myOrders')
    .then(function (response) {
      var ordersTemp = [{id: '125423', address: '3147 Broadway New York, NY', contents: '80 mush pizza'},{id: '125423123', address: '4510 5th ave Brooklyn, NY', contents: '40 mush pizza'},{id: '12542231343', address: '248 W 105 st NY, NY', contents: '10 pizza'}]
      /*var ordersTemp = [];
      
      for(var i = 0; i < response.data[0].current_orders.length; i++){
        var raw = response.data[0].current_orders[i];
        var order = {id: raw._id ,address: raw.destination, contents: raw.items[0].quantity + ' ' + raw.items[0].name}
        ordersTemp.push(order);
      }
      */
      
      this.setState({
        orders: ordersTemp
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  

  deleteRow(id){
    var update = this.state.orders;
    for(var i = 0; i < update.length; i++){
      if(update[i].id == id){
        update.splice(i,1)
      }
    }
    this.setState({
      orders: update,
    });
    this.forceUpdate();
  }

  addOrder(order){
    var update = this.state.orders;
    update.push(order);
    this.setState({
      orders: update
    });
  }

  setToBeDeleted(id){
    this.setState({
      toBeDeleted: id
    })
  }

  haversineDistance(coords1, coords2) {
    var distance =  geolib.getDistance(
      {latitude: coords1[0], longitude: coords1[1]},
      {latitude: coords2[0], longitude: coords2[1]}
    );
    //console.log({latitude: coords1[0], longitude: coords1[1]});
    //console.log({latitude: coords2[0], longitude: coords2[1]})
    return distance;

}



  sendText(order,num){
    Geocode.enableDebug();
    Geocode.fromAddress(order.address).then ( des => {
      Geocode.fromAddress(this.state.origin + 'Dobbs Ferry, NY').then ( orig => {
        //console.log('origin: ' + orig + ' destination: ' + des)
        var coordsOrig =  [orig.results[0].geometry.location.lat,orig.results[0].geometry.location.lng];
        var coordsDes = [des.results[0].geometry.location.lat,des.results[0].geometry.location.lng];
        var distance = this.haversineDistance(coordsOrig,coordsDes);
        //console.log(distance);
        var time = Math.floor(distance / 15000) * 60; //distance over 15 miles per hour on average
        axios.post('http://localhost:3001/sendsms/' + num + '/' + time)
        .then(function (response) {
          console.log('yeehaw');
        })
        .catch(function (error) {
          console.log('eror');
       });
      }).catch(function (error){
        console.log(1);
      });
    }).catch(function (error){
      console.log(2);
    });
  }


  getSelectedOrder(order){
      //Only activate once we need to demo
    if(order.address!=this.state.destination && this.state.map){
      return false;
    }
    if(!this.state.map){
      this.sendText(order,'+19144716528');
      this.setState({
        destination: order.address,
        map: true,
        color: 'green',
        alreadySelected: true
      })
      this.forceUpdate();
      return true;
    }
    else{
      this.setState({
        destination: this.state.destination,
        map: false,
        color: 'red',
        alreadySelected: false
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

    //;axios.get(baseURL + '/completeOrder/' + this.state.toBeDeleted);
    //rating call with value
    this.deleteRow(this.state.toBeDeleted)
    

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
        const color = this.state.color
        return (
          <Tabs>
            <Tab label="Orders" style={{background: this.state.color}}>
              <div className = "container" >
                <center>
                  <Paper style={style.formStyle} zDepth={3}>
                    <h2>To Deliver</h2>
                    <div style={{border: '2px solid ' + color}}>
                      <Popup  style={{width:'100px',height: '100px',color:'black'}} open={this.state.ratingsOn}> 
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
          <Tab label="Directions" style={{background: color}}>
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
