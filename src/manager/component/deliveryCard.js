import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {sendDeliveryOrder,payDelivery} from '../Util/managerDBUtil';

export default class  DeliveryCard extends Component{
	
	constructor(props)
	{
		super(props);

	}

	sendOrder = ()=>
	{
		sendDeliveryOrder(this.props.title)
		.then(result=>
		{
			alert("sendOrder success!");
			window.location.reload();
		}).catch(err=>
		{
			alert("sendOrder failed!\n"+err.message)
		})
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

		payDelivery(this.props.title,amount)
		.then(result=>
		{
			alert("Delivery Person Paid!");
			window.location.reload();
		}).catch(err=>
		{
			alert("Paying Delivery Person Failed!");
		})
	}

  render(){

  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		    />
		    <CardActions>
			<FlatButton label="Send Order" onClick={this.sendOrder}/>  
			<FlatButton label="Pay This Person" onClick={this.payPerson}/>   
		    </CardActions>
		  </Card>
  		)
  };
  
};