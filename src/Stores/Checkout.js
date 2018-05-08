import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import {OrderRequest} from '../Utils/Requests/OrderRequest';

class Checkout extends Component {
  constructor(props) {
  super(props);
  this.state = {
    };
  }

  handleFormChange(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value})
  }

  onSubmitOrder(){
    OrderRequest()
    .then(response => {
      alert("Order Processed" + response.data);
      this.props.history.push('/Homepage');
      return;
    })
    .catch(error => {
      alert("Error " + error);
    })
  }

    render() {
      const style = {
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
       return (
         <center>
         <div>
         <Paper style={style} zDepth={3}>
         <br />
         <div>
         Your Total: $
         {this.props.subtotal}
         </div>
         <br />

         <TextField
         onChange={this.handleFormChange}
         floatingLabelText="Payment Info"
         floatingLabelStyle ={style.floatingLabelStyle}
         floatingLabelFocusStyle={style.floatingLabelFocusStyle}
         inputStyle={style.inputStyle}
       /><br />

       <TextField
       onChange={this.handleFormChange}
       floatingLabelText="Delivery Address"
       floatingLabelStyle ={style.floatingLabelStyle}
       floatingLabelFocusStyle={style.floatingLabelFocusStyle}
       inputStyle={style.inputStyle}
     /><br />

      <RaisedButton label="Submit Order" primary={true} fullWidth={true} onClick = {this.onSubmitOrder}/>

        </Paper>
         </div>
         </center>
       );
       }

  }

  export default Checkout;
