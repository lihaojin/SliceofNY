import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {changePrice} from '../Util/chefDBUtil';

export default class  MenuCard extends Component{
	
	constructor(props)
	{
		super(props);
		this.state = {
			open:false,
			price:0
		}

	}


  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  changePriceState = (e)=>{
  	this.setState({
  		price:e.target.value
  	})
  }

  submitPrice = ()=>{
  	changePrice(this.props.id,this.state.price)
  	.then(result=>
  	{
  		alert("Price Updated Successfully!\n Result: ",result);
  		window.location.reload();
  	}).catch((err)=>{
  		alert("Error Occured! ",err);
  	})
  }

  render(){
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.submitPrice}
      />,
    ];
  	return(
		<Card>
		    <CardHeader
		      title={this.props.title}
		      subtitle={this.props.price}
		      actAsExpander={true}
		      showExpandableButton={true}
		    />
		    <CardActions>
		      <FlatButton label="Delete" />
		      <FlatButton label="Change Price" onClick={this.handleOpen} />
		      <Dialog
		          title="Change Price"
		          actions={actions}
		          modal={true}
		          open={this.state.open}
		        >
		            <TextField
				      floatingLabelText="New Price"
				      floatingLabelFixed={true}
				      onChange ={(e)=>{this.changePriceState(e);}}
				    /><br />

		        </Dialog>
		    </CardActions>
		    <CardText expandable={true}>
		      {this.props.description}
		    </CardText>
		  </Card>
  		)
  };
  
};