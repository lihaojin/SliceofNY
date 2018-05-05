import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import './Styles/Registration.css'
import {Tabs, Tab} from 'material-ui/Tabs';
import {signUp} from './Utils/Requests/auth';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


const style = {
  customWidth: {
  width: 100,
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
      location:"",
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



//Handles post req for signu
onSignUp(){
  signUp(this.state.email,this.state.password, this.state.typeOfUser,
    this.state.name, this.state.store_affiliated_with,this.state.location)
  .then(response => {
    alert("Success" + response.data);
    this.props.history.push('/login');
    return;
  })
  .catch(error => {
    alert("Error " + error);
  })
}



  render() {
    const storeName = (this.state.typeOfUser==="Manager" || this.state.typeOfUser==="Chef") ? 
                           <TextValidator
                          value={this.state.store_affiliated_with}
                          name="store_affiliated_with"
                          validators={['required']}
                          errorMessages={['this field is required']}
                          onChange={this.handleFormChange}
                          floatingLabelText="Store Name"
                          floatingLabelStyle ={style.floatingLabelStyle}
                          floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                          inputStyle={style.inputStyle}/>: null;
      const storeLocation = (this.state.typeOfUser==="Manager") ? 
                           <TextValidator
                          value={this.state.location}
                          name="location"
                          validators={['required']}
                          errorMessages={['this field is required']}
                          onChange={this.handleFormChange}
                          floatingLabelText="Location "
                          floatingLabelStyle ={style.floatingLabelStyle}
                          floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                          inputStyle={style.inputStyle}/>: null;           

                        

    return (
    <div className = "container" >
    <center>
    <ValidatorForm 

                style={{backgroundColor:'rgba(20,20,20,0.7)',margin:20,
                padding:40,display: 'inline-block',height: {flex:1},
                width: {flex:2},textAlign: 'center'}}
                ref="form"
                onSubmit={this.onSignUp}
                onError={errors => console.log(errors)}
            >

    <TextValidator
    name="name"
    value={this.state.name}
    onChange={this.handleFormChange}
    validators={['required']}
    errorMessages={['this field is required']}
    floatingLabelText="Enter your name"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextValidator
    value={this.state.email}
    name="email"
    onChange={this.handleFormChange}
    validators={['required']}
    errorMessages={['this field is required']}
    floatingLabelText="Enter your E-mail Address"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextValidator
    value={this.state.password}
    name="password"
    type="password"
    onChange={this.handleFormChange}
    validators={['required']}
    errorMessages={['this field is required']}
    floatingLabelText="Create a password"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextValidator
    value={this.state.typeOfUser}
    name="typeOfUser"
    validators={['required']}
    errorMessages={['this field is required']}
    onChange={this.handleFormChange}
    floatingLabelText="User Type"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    {storeName}
    <br />
    {storeLocation}
    <br/>

        <br/><br />

    <RaisedButton type="submit" label="Submit"/>
    </ValidatorForm>
    </center>
    </div>
    );
  }
}

export default Registration;
