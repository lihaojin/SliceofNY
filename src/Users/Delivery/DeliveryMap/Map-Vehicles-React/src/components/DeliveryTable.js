import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DeliveryRow from './DeliveryRow'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default class DeliveryTable extends Component{
	constructor(props){
		super(props);
		this.state = {
			orders: this.props.orders,
      temp: ''
		}
	}

  complete(id){
    this.props.setToBeDeleted(id);
    this.props.triggerRating();
  }

	render(){
    if(this.state.orders.length > 0){
		return(
		<div>
	    <MuiThemeProvider>
        <Table>
        <TableHeader>
            <TableHeaderColumn>Order No.</TableHeaderColumn>
            <TableHeaderColumn>Address</TableHeaderColumn> 
            <TableHeaderColumn>Order Details</TableHeaderColumn>
            <TableHeaderColumn>Select</TableHeaderColumn>
            <TableHeaderColumn>Completed?</TableHeaderColumn>
          </TableHeader>
          <TableBody>
          {this.state.orders.map((order, i) =>{
            return(
              <DeliveryRow order={order} ind={i} key = {order.address} getSelectedOrder={this.props.getSelectedOrder.bind(this)} complete={this.complete.bind(this)}/>
              )

          })}
          </TableBody>
          </Table>
          </MuiThemeProvider>
          </div>
          )
  }
  else{
    return(
      <div style={{color:'white'}}>
        <div> NICE WORK! </div>
        <div> NO MORE DELIVERIES </div>

      </div>

      )
  }
	}

}