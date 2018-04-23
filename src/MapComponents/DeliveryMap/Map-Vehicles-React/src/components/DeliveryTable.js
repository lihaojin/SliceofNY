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
			orders: []
		}
	}

componentDidMount(){
	/*
  StoresTopThree()
  .then(response => {
    this.setState({stores:response.data});
  })
  .catch(error => {
    alert("Error" + error);
  })
  */
  //api call to get orders for now i'm just going to hardcode some
    var orders_temp = [{order_number: 1, address: "3147 Broadway Apt. 3", contents:"1 pizza"},{order_number: 2, address: "18 St Nicholas Place Apt. 3B", contents:"2 pizza"}];
    this.setState({
      orders: orders_temp
    });
    this.forceUpdate();
}

	deleteOrder(index){
		var update = this.state.orders;
		update.splice(index,1);
		this.setState({
			orders: update
		});
	}

	addOrder(order){
		var update = this.state.orders;
		update.push(order);
		this.setState({
			orders: update
		});
	}

	render(){
		return(
		<div>
	    <MuiThemeProvider>
        <Table>
        <TableHeader>
            <TableHeaderColumn>Order No.</TableHeaderColumn>
            <TableHeaderColumn>Address</TableHeaderColumn> 
            <TableHeaderColumn>Order Details</TableHeaderColumn>
            <TableHeaderColumn>Select</TableHeaderColumn>
          </TableHeader>
          <TableBody>
          {this.state.orders.map((order, i) =>{
            return(
              <DeliveryRow order={order} index={i} getSelectedOrder={this.props.getSelectedOrder.bind(this)}/>
              )

          })}
          </TableBody>
          </Table>
          </MuiThemeProvider>
          </div>
          )
	}

}