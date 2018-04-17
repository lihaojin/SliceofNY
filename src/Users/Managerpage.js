import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

};

class Manager extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Tabs>
      <Tab label="Employees">
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>
    <h2>Employees</h2>
    <Table>
  <TableHeader>
    <TableRow>
      <TableHeaderColumn>ID</TableHeaderColumn>
      <TableHeaderColumn>Name</TableHeaderColumn>
      <TableHeaderColumn>Position</TableHeaderColumn>
      <TableHeaderColumn>Pay</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableRowColumn>1</TableRowColumn>
      <TableRowColumn>John Smith</TableRowColumn>
      <TableRowColumn>Chef</TableRowColumn>
      <TableRowColumn>$20/hr</TableRowColumn>
    </TableRow>
  </TableBody>
</Table>
    </Paper>
    </center>
    </div>
    </Tab>

    <Tab label="Open Orders">
    <div className = "container" >
    <center>
    <Paper style={style.formStyle} zDepth={3}>
    <h2>Open Orders</h2>
    <Table>
  <TableHeader>
    <TableRow>
      <TableHeaderColumn>Order No.</TableHeaderColumn>
      <TableHeaderColumn>Date</TableHeaderColumn>
      <TableHeaderColumn>Time</TableHeaderColumn>
      <TableHeaderColumn>Status</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableRowColumn>123456</TableRowColumn>
      <TableRowColumn>3/20/18</TableRowColumn>
      <TableRowColumn>1:30 PM</TableRowColumn>
      <TableRowColumn>Preparing</TableRowColumn>
    </TableRow>
  </TableBody>
  </Table>
    </Paper>
    </center>
    </div>
    </Tab>
      </Tabs>
    );
  }
}

export default Manager;
