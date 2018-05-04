import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {approveCustomer} from '../Util/managerDBUtil';
export default class  CustomerCard extends Component{
	
	constructor(props)
	{
		super(props);


	}

	approve = ()=>
	{
		approveCustomer(this.props.title).then(result=>
		{
			alert("Approval Complete!");
			window.location.reload();
		}).catch(err=>{
			alert("Error Occured Approving Customer!");
		})
	}

  render(){
  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		      subtitle={this.props.status}
		    />
		    <CardActions>
		      <FlatButton label="Blacklist"/>
		      <FlatButton label="Approve" onClick={this.approve}  />      
		    </CardActions>
		  </Card>
  		)
  };
  
};