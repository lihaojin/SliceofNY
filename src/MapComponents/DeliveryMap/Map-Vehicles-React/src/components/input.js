import React, { Component } from 'react';
import DeliveryTable from "./DeliveryTable"

const google = window.google;

class Input extends Component{
  constructor(props) {
    super(props);
    //this.submit = this.submit.bind(this);    
    this.state ={
      origin: "",
      destination:""
    }
  }

  componentDidMount() {
 
    var input = document.getElementsByClassName('form-control');
    for (var i = 0; i < input.length; i++) {
        new google.maps.places.SearchBox(input[i]);
    }
  }

  handleSubmit(event) {
    this.setState({origin: this.state.origin});
    console.log(this.state.origin);
  }

  handleAddressChange(event){
    if(event.target.value){
      this.setState({origin: event.target.value});
    }
  }

  clearOrder(){
    this.setState({
      origin: "",
      destination: ""
    })
  }

  outputState(){
    console.log(this.state.origin);
  }

  getSelectedOrder(order){
    console.log(this.state.origin);
    this.setState({
      destination: order.address
    })
    this.submit(this.state.origin,order.address);
  }


  render(){
    return(
      <section>
          <DeliveryTable orders={this.state.orders} getSelectedOrder={this.getSelectedOrder.bind(this)}/>
          <div> <button onClick = {this.clearOrder.bind(this)}> Clear Directions </button> </div>
          <div>

            <label id="Current Address">Enter your current address</label>
            <input type="submit" id="Address" name="CurrAddress" type="text" value={this.state.origin} onChange={this.handleAddressChange.bind(this)} />

        <button onClick={this.handleSubmit.bind(this)}>Send data!</button>
        <button onClick={this.outputState.bind(this)}>Output Data! </button>
      </div>
      </section>
    );
  }

  submit(orig, add){
    var origin = orig;
    var destination = add;
    console.log(origin,destination);
    if(origin!=="" && destination!==""){
      var geocoder = new google.maps.Geocoder();
      var values = [];
      var that = this;
      console.log('hello');
      geocoder.geocode({address: origin},function(results,status){
        values.push([origin,results[0].geometry.location]);
        geocoder.geocode({address: destination}, function(results, status) {
            values.push([destination,results[0].geometry.location]);
            that.props.pSubmit(values);
        });
      });
      
    }
  }
}

export default Input;