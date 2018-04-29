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
    var orders_temp = [{address: "3147 Broadway Apt. 3", contents:"1 pizza"},{address: "18 St Nicholas Place Apt. 3B", contents:"2 pizza"},{address: "4510 5th Avenue", contents:"800 pizzas"}];
    this.setState({
      orders: orders_temp
    });
    this.forceUpdate();
}

	deleteRow(address){
		var update = this.state.orders;
    for(var i = 0; i < update.length; i++){
      if(update[i].address == address){
        update.splice(i,1)
      }
    }
		
		this.setState({
			orders: update,
		});

    console.log(this.state.orders)
    this.forceUpdate();
	}

	addOrder(order){
		var update = this.state.orders;
		update.push(order);
		this.setState({
			orders: update
		});
	}

  //calls complete in Delivery.js
  complete(){
    this.props.complete()
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
              <DeliveryRow order={order} key = {order.address} getSelectedOrder={this.props.getSelectedOrder.bind(this)} deleteRow={this.deleteRow.bind(this)} complete={this.complete.bind(this)}/>
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