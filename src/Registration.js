import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import './Styles/Registration.css'
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


setTypeLower(){
  var update = this.state.typeOfUser;
  var char = update.substring(0,1).toUpperCase();
  var rest = update.substring(1,update.length).toLowerCase();
  this.setState({typeOfUser: char + rest});

}

//Handles post req for signu
onSignUp(){
  this.setTypeLower();
  signUp(this.state.email,this.state.password, this.state.typeOfUser,this.state.name, this.state.store_affiliated_with)
  .then(response => {
    alert("Success" + response.data)
  })
  .catch(error => {
    alert("Error " + error);
  })
}



  render() {
    const storeName = (this.state.typeOfUser==="Manager" || this.state.typeOfUser==="Chef") ? 
                           <TextField
                          value={this.state.store_affiliated_with}
                          name="store_affiliated_with"
                          onChange={this.handleFormChange}
                          floatingLabelText="Store Name"
                          floatingLabelStyle ={style.floatingLabelStyle}
                          floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                          inputStyle={style.inputStyle}/>: null;

                        

    return (
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>

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
    type="password"
    onChange={this.handleFormChange}
    floatingLabelText="Create a password"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    value={this.state.typeOfUser}
    name="typeOfUser"
    onChange={this.handleFormChange}
    floatingLabelText="User Type"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    {storeName}
    <br />

        <br/><br />

    <RaisedButton onClick={this.onSignUp} label="Submit"/>
    </Paper>
    </center>
    </div>
    );
  }
}

export default Registration;
