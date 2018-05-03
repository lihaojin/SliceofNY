import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
export default class  CustomerCard extends Component{
	
	constructor(props)
	{
		super(props);


	}


  render(){
  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		      subtitle={this.props.status}
		    />
		    <CardActions>
		      <FlatButton label="Blacklist" />
		      <FlatButton label="Approve"  />      
		    </CardActions>
		  </Card>
  		)
  };
  
};