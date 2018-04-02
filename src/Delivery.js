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

class Delivery extends Component {

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
    <h2>To Deliver</h2>
    <Table>
  <TableHeader>
    <TableRow>
      <TableHeaderColumn>Order No.</TableHeaderColumn>
      <TableHeaderColumn>Address</TableHeaderColumn>
      <TableHeaderColumn>Deliver By</TableHeaderColumn>
      <TableHeaderColumn>Travel Time</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableRowColumn>123456</TableRowColumn>
      <TableRowColumn>123 Random St. New York, NY 12345</TableRowColumn>
      <TableRowColumn>3/20/18 2:00 PM</TableRowColumn>
      <TableRowColumn>15 min</TableRowColumn>
    </TableRow>
  </TableBody>
</Table>
    </Paper>
    </center>
    </div>
    </Tab>

    <Tab label="Directions">
    </Tab>
      </Tabs>
    );
  }
}

export default Delivery;
