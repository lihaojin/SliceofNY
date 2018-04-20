import React, { Component } from 'react';
import RoutePaths from './routes/RoutePaths';
import AppBar from 'material-ui/AppBar' ;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './Styles/App.css'


class App extends Component {

  constructor(props) {
  super(props);
  this.state = {open:false,open2:false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleToggle2 = () => this.setState({open2: !this.state.open2});

  render() {
    const style = {
      backgroundColor:'black',

    }

    return (
      <MuiThemeProvider>
      <AppBar title='Slice of NY'
      style={style}
      iconElementRight={<FlatButton label="My Cart" onClick={this.handleToggle2}/>}
      onLeftIconButtonClick={this.handleToggle}/>

      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
        <MenuItem onClick={this.handleClose} href="/Homepage">Home</MenuItem>
        <MenuItem onClick={this.handleClose} href="/Login">Log In</MenuItem>
        <MenuItem onClick={this.handleClose} href="/Registration">Sign Up</MenuItem>
        <MenuItem onClick={this.handleClose} href="/MapPage">Map </MenuItem>
      </Drawer>


      <Drawer width={200}
      docked={false}
      openSecondary={true}
      open={this.state.open2}
      onRequestChange={(open2) => this.setState({open2})}>
      <h3>Items</h3>
      <div className="checkout">
      <RaisedButton label="Checkout" primary={true} fullWidth={true}/>
      </div>
      </Drawer>
      <RoutePaths/>
      </MuiThemeProvider>
    );
  }
}

export default App;
