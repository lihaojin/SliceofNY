import React, { Component } from 'react';
import DeliveryTable from "./DeliveryTable"

const google = window.google;

class Input extends Component{
  constructor(props) {
    super(props);
    //this.submit = this.submit.bind(this);    
    this.state ={
      origin: "",
      temp_origin: "",
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
    event.preventDefault();
    const orig = this.state.temp_origin
    this.setState({origin: orig});
    console.log(orig);
  }

  handleAddressChange(event){
    if(event.target.value){
      this.setState({temp_origin: event.target.value});
    }
  }

  clearOrder(){
    this.setState({
      origin: "",
      destination: ""
    })
    this.props.clear();
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
            <form>
                <label>Current Address:
                    <input type="text" onChange={this.handleAddressChange.bind(this)}/>
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
                <button type="submit" value="Submit" onClick={this.clearOrder.bind(this)}>Clear Order </button>
            </form>

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