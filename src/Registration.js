import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import './Registration.css'

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
    this.state = {value: 1};
  }

handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>
    <div className = "firstname">
    <TextField
    floatingLabelText="Enter your full name"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    />
    </div>

    <TextField
    floatingLabelText="Enter your last name"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    floatingLabelText="Create a username"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    floatingLabelText="Create a password"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <TextField
    floatingLabelText="Enter your E-mail Address"
    floatingLabelStyle ={style.floatingLabelStyle}
    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
    inputStyle={style.inputStyle}
    /><br />

    <h3>Select user type</h3>
    <div className = "dropdownmenu">
    <DropDownMenu value={this.state.value} onChange={this.handleChange} style={style.customWidth} labelStyle={style.labelStyle}>
          <MenuItem value={1} primaryText="Customer" />
          <MenuItem value={2} primaryText="Delivery" />
          <MenuItem value={3} primaryText="Cook" />
          <MenuItem value={4} primaryText="Manager" />
        </DropDownMenu>
    </div>
        <br /><br />

    <RaisedButton label="Submit"/>
    </Paper>
    </center>
    </div>
    );
  }
}

export default Registration;
