import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import {OrderRequest} from '../Utils/Requests/OrderRequest';
import {customerOrder} from '../Utils/Requests/OrderRequest';
import jwt from 'jsonwebtoken';
import '../Styles/Checkout.css'
import Popup from "reactjs-popup";
class Checkout extends Component {
  constructor(props) {
  super(props);
  this.state = {
    address:"",
    phone_number:"",
    rating: false,
    cancel: false,
    currIndex: 0,
    storeRating: false
    };
    this.onSubmitOrder = this.onSubmitOrder.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value})
  }

  handleRatingHelper(name,itemOrStore, value){
    if (!itemOrStore){
      alert(name + ' item api call ' + value)
    }
    else{
      alert(name + ' store api call ' + value)
    }
  }

  handleRating(value){
    this.handleRatingHelper(this.state.currName,this.state.storeRating,value)
    this.setState({
      currIndex: ++this.state.currIndex,
    })

    if(this.state.currIndex === this.props.cart.length){
      this.setState({
        currName: localStorage.getItem('storeName'),
        storeRating: true

      })

    }
    else if(this.state.currIndex > this.props.cart.length){
      this.setState({
        ratings:false,
        currIndex: 0,
        storeRating: false
      })

      this.onSubmitOrder(value);
    }
    else{
      this.setState({
        currName: this.state.cart[this.state.currIndex].name
      })
    }
  }

  handleCancel(){
    this.setState({
      rating: false
    })
  }

  async getRatings(){
    var rating = true;
    await this.setState({
      rating: rating,
      cart: this.props.cart,
      currName: this.props.cart[this.state.currIndex].name
    })

    this.forceUpdate();

  }

  async onSubmitOrder(value){
      //this.handleRatingHelper(this.state.currName,this.state.storeRating,value)
      var quantity = 1;
      console.log("cleared")

        var name = localStorage.getItem('storeName');
        var phone_number = parseInt(this.state.phone_number);
        var items = [
          this.props.cart.map(function(item){
            return {name:item.name}
          }),
          quantity
        ];
        var destination = this.state.address;
      if(localStorage.getItem('token') === null){
      OrderRequest(name,items,destination,phone_number)
      .then(response => {
        alert("Order Processed" + response.data);
        this.props.history.push('/Homepage');
        return;
      })
      .catch(error => {
        alert("Error " + error);
      })
      this.props.clearCart();
      }
      else{
        customerOrder(name,items,destination,phone_number)
        .then(response => {
          alert("Order Processed" + response.data);
          this.props.history.push('/Homepage');
          return;
        })
        .catch(error => {
          alert("Error " + error);
        })
      }

  }

    render() {
      const style = {
      display: 'inline-block',
      height: {flex:1},
      width: {flex:2},
      margin: 20,
      padding: 40,
      textAlign: 'center',
      backgroundColor:'rgba(20,20,20,0.85)',
      floatingLabelStyle: {
        color: 'white',
      },
      floatingLabelFocusStyle: {
        color: 'white',
      },
      inputStyle:{
        color: 'white',
      },
      orderRowStyle:{
        color: 'white',
        backgroundColor:'rgba(20,20,20,0.1)'
      }
    }
       return (
         <div className="container">
         <center>
         <div>
         <Paper style={style} zDepth={3}>
         <br />
         <div className="total">
         <h2>Order Review</h2>
         Your Total: $
         {this.props.subtotal}
         <br /><br />
         <div style={{fontweight:'bold'}}> Your Order: </div>
         {this.props.cart.map(function(item){
          return <div> {item.name}</div>
        })}
         </div>
         <br />


       <TextField
       onChange={this.handleFormChange}
       name="address"
       value={this.state.address}
       floatingLabelText="Delivery Address"
       floatingLabelStyle ={style.floatingLabelStyle}
       floatingLabelFocusStyle={style.floatingLabelFocusStyle}
       inputStyle={style.inputStyle}
     /><br />

     <TextField
     onChange={this.handleFormChange}
     name="phone_number"
     value={this.state.phone_number}
     floatingLabelText="Phone Number"
     floatingLabelStyle ={style.floatingLabelStyle}
     floatingLabelFocusStyle={style.floatingLabelFocusStyle}
     inputStyle={style.inputStyle}
   /><br />

      <RaisedButton label="Submit Order" primary={true} fullWidth={true} onClick = {this.onSubmitOrder.bind(this)}/>

        </Paper>
         </div>
         </center>
         </div>
       );
       }

  }

  export default Checkout;
