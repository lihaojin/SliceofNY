import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import './Registration.css'
import {Tabs, Tab} from 'material-ui/Tabs';
import {signUp} from './Utils/Requests/auth';

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
  customWidth: {
  width: 250,
  },
  floatingLabelStyle: {
    color: 'white',
  },
  floatingLabelFocusStyle: {
    color: 'white',
  },
  inputStyle:{
    color: 'white',
  },
  labelStyle:{
    color:'white',
  }
};

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password : "",
      typeOfUser : "",
      store_affiliated_with : "",
      value: 1};
      this.handleFormChange = this.handleFormChange.bind(this);
      this.onSignUp = this.onSignUp.bind(this);
  }

//Set state for textfields
  handleFormChange(e){
          const value = e.target.value;
          const name = e.target.name;
          this.setState({[name]: value})
      }

//Set state for typeOfUser in dropdown & change dropdown selections
 handleChange = (event, index, value) => this.setState({value,typeOfUser:event.target.name});

//Handles post req for signup
onSignUp(){
  signUp(this.state.email,this.state.password, this.state.typeOfUser, this.state.store_affiliated_with)
  .then(response => {
    alert("Success" + response.data)
  })
  .catch(error => {
    alert("Error " + error);
  })
}



  render() {
    return (
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>

    <DropDownMenu value={this.state.value} onChange={this.handleChange} style={style.labelStyle}>
    <MenuItem name="Customer" value={1} primaryText="Customer" />
    <MenuItem name="Manager" value={2} primaryText="Manager" />
    <MenuItem name="Chef"  value={3} primaryText="Chef" />
    <MenuItem name="Delivery" value={4} primaryText="Delivery" />
    </DropDownMenu><br />

    <TextField
    name="name"
    value={this.state.name}
    onChange={this.handleFormChange}
    floatingLabelText="Enter your name"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    value={this.state.email}
    name="email"
    onChange={this.handleFormChange}
    floatingLabelText="Enter your E-mail Address"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    value={this.state.password}
    name="password"
    onChange={this.handleFormChange}
    floatingLabelText="Create a password"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    value={this.state.password}
    name="store_affiliated_with"
    onChange={this.handleFormChange}
    floatingLabelText="Store Name"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />


        <br/><br />

    <RaisedButton onClick={this.onSignUp} label="Submit"/>
    </Paper>
    </center>
    </div>
    );
  }
}

export default Registration;
