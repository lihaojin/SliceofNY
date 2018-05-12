import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {payChef} from '../Util/managerDBUtil';

export default class  ChefCard extends Component{
	
	constructor(props)
	{
		super(props);

	}

	
	payPerson =()=>
	{
		const amount = prompt("Please enter your complaint: ");
	     if (amount === null) {
	        return; //break out of the function early
	    }
	    if (amount==="")
	    {
	    	alert("Can't be blank!");
	    	return;
	    }

		payChef(this.props.title,amount)
		.then(result=>
		{
			alert("Chef Person Paid!");
			window.location.reload();
		}).catch(err=>
		{
			alert("Paying Chef Person Failed!");
		})
	}

  render(){

  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		    />
		    <CardActions>
			<FlatButton label="Pay This Person" onClick={this.payPerson}/>   
		    </CardActions>
		  </Card>
  		)
  };
  
};