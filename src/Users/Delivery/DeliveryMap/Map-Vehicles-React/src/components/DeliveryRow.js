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
import RaisedButton from 'material-ui/RaisedButton'

export default class DeliveryRow extends Component{
	constructor(props){
		super(props);
		this.state={
			order: [],
			index: -1,
			completed:false,
			selected: {background:'white'},
			seletedYet: false
		}
	}

	componentDidMount(){
		this.setState({
			order: this.props.order ,
			index: this.props.index
		})
	}

	getOrder(){
		var cont = this.props.getSelectedOrder(this.state.order);
		if(cont){
			this.setHighlightColor();
			this.forceUpdate()
		}
		
	}

	setHighlightColor(){
		if(!this.state.selectedYet){
			this.setState({
				selected: {background: 'blue'},
				selectedYet: true
			});
		}
		else{
			this.setState({
				selected: {background: 'white'},
				selectedYet: false
			});
			this.props.complete(false);
		}
		
	}

	delete(){
		this.setState({completed: true});
		this.props.deleteRow(this.state.order.address);
		this.props.complete(true)
	}

	render(){
		return(
			<TableRow style={this.state.selected} key={this.state.index}>
                <TableRowColumn>{this.props.ind + 1}</TableRowColumn>
                <TableRowColumn>{this.state.order.address}</TableRowColumn>
                <TableRowColumn>{this.state.order.contents}</TableRowColumn>
                <TableRowColumn><RaisedButton onClick={this.getOrder.bind(this)}>Select</RaisedButton></TableRowColumn>
                <TableRowColumn><RaisedButton onClick={this.delete.bind(this)}>Completed</RaisedButton></TableRowColumn>
              </TableRow>

			)
	}
}

