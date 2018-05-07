import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import DeliveryCard from '../component/deliveryCard';
import {getDelivery} from '../Util/managerDBUtil';


export default class Delivery extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			deliveryPeople:[],
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
			getDelivery().then(result=>
			{
				let people = []

				for(let i = 0; i< result.data.length; ++i)
					people.push(result.data[i].email)

				this.setState({"deliveryPeople":people});
			})
			.catch(err=>{
				alert("getting delivery Error: ",err);
			});
		}
		 
	}
 
	render()
	{

		const delivery = this.state.deliveryPeople.map((person)=>

			<div key={person.toString()}>
			<br></br>
			<DeliveryCard title={person} 
			 />
			<br></br>
			</div>
			)

		return(
			<div>
			{delivery}
			<br/>
			</div>

			)

	}
}