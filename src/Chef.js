import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

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

class Chef extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Tabs>
      <Tab label="My Menu">
      </Tab>

      <Tab label="Add Menu">
      <center>
      <Paper style={style.formStyle} zDepth={3}>
      <h2>Pizza</h2>
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />

      <h2>Beverages</h2>
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <RaisedButton label="Submit"/>
      </Paper>
      </center>
      </Tab>

      <Tab label="Build Your Own Pizza Menu">
      <center>
      <Paper style={style.formStyle} zDepth={3}>
      <h2>Dough</h2>
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />

      <h2>Cheese</h2>
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />

      <h2>Toppings</h2>
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <TextField/><br />
      <RaisedButton label="Submit"/>
      </Paper>
      </center>
      </Tab>
      </Tabs>
    );
  }
}

export default Chef;
