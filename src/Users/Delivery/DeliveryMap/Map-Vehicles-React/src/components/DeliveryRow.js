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
			selectedYet: false
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
		this.setHighlightColor(cont);
		this.forceUpdate()
		}
		
	

	setHighlightColor(sYet){
		//sYet ensures only one thing is selected 
		if(!this.state.selectedYet && sYet){//
			this.setState({
				selected: {background: 'green'},
				selectedYet: true
			});
		}
		else{
			this.setState({
				selected: {background: 'white'},
				selectedYet: false
			});
			
		}
		
	}
	complete(){
		if(this.state.selectedYet){
			this.setState({
				selected: {background: 'white'},
				selectedYet: false
			})
			this.props.complete(this.state.order.id);
		}
		else{
			alert('Yo')
		}
	}

	render(){
		return(
			<TableRow style={this.state.selected} key={this.state.index}>
                <TableRowColumn>{this.props.ind + 1}</TableRowColumn>
                <TableRowColumn>{this.state.order.address}</TableRowColumn>
                <TableRowColumn>{this.state.order.contents}</TableRowColumn>
                <TableRowColumn><RaisedButton onClick={this.getOrder.bind(this)}>Select</RaisedButton></TableRowColumn>
                <TableRowColumn><RaisedButton onClick={this.complete.bind(this)}>Completed</RaisedButton></TableRowColumn>
              </TableRow>

			)
	}
}

