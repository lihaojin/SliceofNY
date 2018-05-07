import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {handleComplaint} from '../Util/managerDBUtil';
export default class  ComplaintCard extends Component{
	
	constructor(props)
	{
		super(props);


	}

	resolve = ()=>
	{
		handleComplaint(this.props.id)
		.then(result=>
		{
			alert("handle Complaint success!");
			window.location.reload();
		}).catch(err=>
		{
			alert("handle Complaint failed!\n"+err.message)
		})
	}

  render(){

  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		    />
		    <CardActions>
			<FlatButton label="Resolve" onClick={this.resolve}/>     
		    </CardActions>
		  </Card>
  		)
  };
  
};