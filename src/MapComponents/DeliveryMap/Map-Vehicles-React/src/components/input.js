import React, { Component } from 'react';

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

  getOrders(){
    //api call to get orders for now i'm just going to hardcode some
    var orders_temp = [{order_number: 1, address: "3147 Broadway Apt. 3", contents:"1 pizza"},{order_number: 2, address: "18 St Nicholas Place Apt. 3B", contents:"2 pizza"}];
    this.setState({
      orders: orders_temp
    });
    this.forceUpdate();
  }

  componentDidMount() {
    this.getOrders();
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


  render(){
    return(
      <section>
        <table>
          <tr>
            <th>Order No.</th>
            <th>Address</th> 
            <th>Order Details</th>
            <th>Select</th>
          </tr>
          {this.state.orders.map((order, i) =>{
            return(
              <tr>
                <td>{order.order_number}</td>
                <td>{order.address}</td>
                <td>{order.contents}</td>
                <td><button> Select </button></td>
              </tr>

              )

          })}
          </table>
          <div> <button onClick = {this.clearOrder.bind(this)}> Clear Directions </button> </div>
      </section>
    );
  }

  submit(e){
    e.preventDefault();
    var origin = this.state.origin
    var destination = this.state.destination;
    if(origin!=="" && destination!==""){
      var geocoder = new google.maps.Geocoder();
      var values = [];
      var that = this;
      geocoder.geocode({address: origin}, function(results, status) {
        values.push([origin,results[0].geometry.location]);
        geocoder.geocode({address: destination}, function(results, status) {
            values.push([destination,results[0].geometry.location]);
            that.props.pSubmit(values);
        });
      });
      document.getElementsByName('origin')[0].value='';
      document.getElementsByName('destination')[0].value='';
    }
  }
}

export default Input;