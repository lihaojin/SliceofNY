import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {getStore} from '../Util/managerDBUtil';

export default class  Orders extends Component{
	
	constructor(props)
	{
		super(props);
		this.state = {
			currentOrder: []
		}

	}

	getOrder = (email)=>
	{
		getStore().then(result=>
		{
			// currentOrder = []
			// for(let i = 0; i< result.data.length; ++i)
			// {
			// 	if(result.data[i].manager_email === email)
			// 		result.data[i].currentOrder	
			// }
			window.location.reload();
		}).catch(err=>{
			alert("Error Occured getting store from getOrder!");
		})
	}

  render(){
  	return(
		<Card>
		    <CardHeader
		      title="Sample Order Here"
		    />
		  </Card>
  		)
  };
  
};