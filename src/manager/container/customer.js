import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import CustomerCard from '../component/customerCard';
import {getAllRegisteredCustomers} from '../Util/managerDBUtil';
import {getAllPendingCustomers} from '../Util/managerDBUtil';
import {getAllBlacklistedCustomers} from '../Util/managerDBUtil';


export default class Customers extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			registered:[],
			blackListed:[],
			pending:[],
			redirect:false
		}
	}

	componentDidMount(){

		if(localStorage.getItem('token')==null)
		{	
			this.setState({redirect:true});
			alert("You are not logged in!");
		}
		else
		{
			getAllPendingCustomers().then( result=>{
				console.log("Pending Customer Result ",result);
				const cusomters = result.data.pending_customers.email;
				if(cusomters.length!=0)
				{
					this.setState({
			  		pending: result.data.pending_customers.email,
			  		redirect:false
			  		})
				}
		  	 
		  	}).catch(error=>{
		  		console.log("error in Pending Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});

		  	getAllRegisteredCustomers().then( result=>{
				console.log("registered Customer Result ",result);
				const customers = result.data.registered_customers.email
				if(customers.length!=0)
				{
		  	 this.setState({
		  		registered: customers,
		  		redirect:false
		  		})}
		  	}).catch(error=>{
		  		console.log("error in registered Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});

		  	getAllBlacklistedCustomers().then( result=>{
		  		console.log("blackListed Customer Result ",result);
		  		const customers = result.data.blacklisted_customers.email
				if(customers.length!=0)
				{


		  	 this.setState({
		  		blackListed: customers,
		  		redirect:false
		  		})				}
		  	}).catch(error=>{
		  		console.log("error in blacklisted Customer DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});
		}
		 
	}
 
	render()
	{
		console.log("Pending: ",this.state.pending);
		console.log("Blacklisted ", this.state.blackListed);
		console.log("Registered ",this.state.registered);
		const pending = this.state.pending.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Pending "
			 />
			<br></br>
			</div>
			)
		const registered = this.state.registered.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Registered "
			 />
			<br></br>
			</div>
			)
		const blacklisted = this.state.blackListed.map((customer)=>

			<div key={customer.toString()}>
			<br></br>
			<CustomerCard title={customer} status="Status: Blacklisted "
			 />
			<br></br>
			</div>
			)

		return(
			<div>
			{pending}
			<br/>
			{registered}
			<br/>
			{blacklisted}
			</div>

			)

	}
}