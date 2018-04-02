import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import './Login.css'

class Login extends Component {

  state = {
    username:'',
    password:''
  }

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
      floatingLabelText="Username"
      floatingLabelStyle ={style.floatingLabelStyle}
      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
      inputStyle={style.inputStyle}
    /><br />
      <TextField
      floatingLabelText="Password"
      type="password"
      floatingLabelStyle ={style.floatingLabelStyle}
      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
      inputStyle={style.inputStyle}
    /><br />

      <RaisedButton label="Log In"/>
      </Paper>
      </center>
      </div>
    );
  }
}

export default Login;
