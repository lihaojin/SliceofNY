import React, { Component } from 'react';
import DeliveryTable from "./DeliveryTable"

const google = window.google;

class Input extends Component{
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);    
    this.state ={
      orders: [],
      origin: "",
      destination:""
    }
  }

  componentDidMount() {
    //this.getOrders();
    var input = document.getElementsByClassName('form-control');
    for (var i = 0; i < input.length; i++) {
        new google.maps.places.SearchBox(input[i]);
    }
  }

  clearOrder(){
    this.setState({
      origin: "",
      destination: ""
    })
  }

  selectOrder(){
    var pos = null;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

         });
        }

      
    this.setState({
      origin: pos,
      destination: this.state.orders[0].address
    })
    this.submit();
    console.log('selected');
    this.forceUpdate();
  }

  render(){
    return(
      <section>
          <DeliveryTable orders={this.state.orders}/>
          <div> <button onClick = {this.clearOrder.bind(this)}> Clear Directions </button> </div>
      </section>
    );
  }

  submit(){
    var origin = this.state.origin
    var destination = this.state.destination;
    console.log(origin);
    if(origin!=="" && destination!==""){
      var geocoder = new google.maps.Geocoder();
      var values = [];
      var that = this;
      values.push([origin,origin]);
        
        geocoder.geocode({address: destination}, function(results, status) {
            values.push([destination,results[0].geometry.location]);
            that.props.pSubmit(values);
        });
      
      document.getElementsByName('origin')[0].value='';
      document.getElementsByName('destination')[0].value='';
    }
  }
}

export default Input;