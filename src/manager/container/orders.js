import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {getMyStoreInfo} from '../Util/managerDBUtil';
import { Redirect } from 'react-router';

export default class  Orders extends Component{
	
	constructor(props)
	{
		super(props);
		this.state = {
			currentOrder: [],
			redirect:false
		}

	}

	componentDidMount(){
	if(localStorage.getItem('token')==null)
		{	
			this.setState({redirect:true});
		}
	else{

			 getMyStoreInfo().then(result=>
			{
				let orders = []
				for(let i=0; i<result.data.current_orders.length;++i)
					 orders.push(result.data.current_orders[i])
				this.setState({
					"currentOrder":orders
				})
			}).catch(err=>{
				alert("Error Occured getting store from getOrder!");
			})
		}
	}

  render()
  {
		console.log("Result: ",this.state.currentOrder)
	  	if(this.state.redirect)
		{
				return(
					<Redirect to='/login'/>
					)
		}

	  const tmp = this.state.currentOrder.length
	  let orders = null;
	  if(tmp!=0)
	  {
	    orders = this.state.currentOrder.map((order)=>
	  	{
	  		<div key={order.toString()}>
				<Card>
			    <CardHeader
			      title={this.state.currentOrder.confirmation}
			    />
			  </Card>
		
			</div>

	  	})
		}

	  	return(
	  		<p>
	  		
	  		</p>	
	  		)
	  }
	};
  