import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {sendDeliveryOrder} from '../Util/managerDBUtil';
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

  render(){

  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		    />
		    <CardActions>
			<FlatButton label="Send Order" onClick={this.sendOrder}/>     
		    </CardActions>
		  </Card>
  		)
  };
  
};