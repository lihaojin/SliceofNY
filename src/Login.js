import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {loginUser} from './Utils/Requests/auth';
import './Styles/Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password : "",
      value: 1};
      this.handleFormChange = this.handleFormChange.bind(this);
      this.onLogin = this.onLogin.bind(this);
  }



  handleFormChange(e){
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value})
  }



  onLogin(){
    loginUser(this.state.email,this.state.password)
    .then(response => {
      alert("Success" + response.data)
      console.log(response)
      let token = response.data.token;
      localStorage.setItem("token",token);
      this.props.history.push('/chef');
    })
    .catch(error => {
      alert("Error " + error.toString());
    })
  }

 //handleChange = (event, index, value) => this.setState({value,typeOfUser:event.target.name});

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      <div className = 'container'>
      <center>
      <Paper style={style} zDepth={3}>
      <h2>LOG IN</h2>

      <TextField
      value={this.state.email}
      name="email"
      onChange={this.handleFormChange}
      floatingLabelText="E-mail"
      floatingLabelStyle ={style.floatingLabelStyle}
      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
      inputStyle={style.inputStyle}
    /><br />

      <TextField
      value={this.state.password}
      name="password"
      onChange={this.handleFormChange}
      floatingLabelText="Password"
      type="password"
      floatingLabelStyle ={style.floatingLabelStyle}
      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
      inputStyle={style.inputStyle}
    /><br />


      <RaisedButton onClick = {this.onLogin} label="Log In"/>
      </Paper>
      </center>
      </div>
    );
  }
}

export default Login;
