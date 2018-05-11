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
      value:3,
      location:""};
      this.handleFormChange = this.handleFormChange.bind(this);
      this.onSignUp = this.onSignUp.bind(this);
      this.handleDrowDown = this.handleDrowDown.bind(this);
  }

//Set state for textfields
  handleFormChange(e){
          const value = e.target.value;
          const name = e.target.name;

          this.setState({[name]: value})
      }

  handleDrowDown(e,index,value){
    const val = e.target.textContent;
    const map = {"Manager":1,"Chef":2,"Customer":3,"Delivery":4}
    this.setState({
      typeOfUser:val,
      value:map[val]
    })
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

                style={{backgroundColor:'rgba(20,20,20,0.85)',margin:20,
                padding:40,display: 'inline-block',height: {flex:1},
                width: {flex:2},textAlign: 'center'}}
                ref="form"
                onSubmit={this.onSignUp}
                onError={errors => console.log(errors)}
            >

    <h2>Sign Up</h2>
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
    <DropDownMenu value={this.state.value} style={{backgroundColor:'white',color:'white'}} onChange={this.handleDrowDown}>
          <MenuItem value={1} primaryText="Manager" />
          <MenuItem value={2} primaryText="Chef" />
          <MenuItem value={3} primaryText="Customer" />
          <MenuItem value={4} primaryText="Delivery" />
        
        </DropDownMenu>
  
    <br />

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
