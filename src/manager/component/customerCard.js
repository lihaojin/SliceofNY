import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {approveCustomer} from '../Util/managerDBUtil';
import {blacklistCustomer} from '../Util/managerDBUtil';
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

	blackList = ()=>
	{
		blacklistCustomer(this.props.title).then(result=>
		{
			alert("Blacklist Complete!");
			window.location.reload();
		}).catch(err=>{
			alert("Error Occured Blacklisting Customer!");
		})
	}

  render(){
  	const button = (this.props.isBlacklist) ?
  		 null: (<div><FlatButton label="Approve" onClick={this.approve}/>
  		 	<FlatButton label="Blacklist" onClick={this.blackList}/></div>);
  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		      subtitle={this.props.status}
		    />
		    <CardActions>
		      {button}  />      
		    </CardActions>
		  </Card>
  		)
  };
  
};