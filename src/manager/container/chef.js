import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ChefCard from '../component/chefCard';
import {getChef,payChef} from '../Util/managerDBUtil';
import { Redirect } from 'react-router';


export default class ChefControl extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			chefPeople:[],
			redirect:false
		}
	}

	componentDidMount(){

		if(localStorage.getItem('token')===null)
		{	
			this.setState({redirect:true});
		}
		else
		{
			getChef().then(result=>
			{
				this.setState({"chefPeople":result.data});
			})
			.catch(err=>{
				alert("getting chefPeople Error: ",err);
			});
			console.log(this.state.chefPeople)
		}
		 
	}
 
	render()
	{
		if(this.state.redirect)
		{
			return(
				<Redirect to='/login'/>
				)
		}

		const chef = this.state.chefPeople.map((person)=>

			<div key={person.toString()}>
			<br></br>
			<ChefCard title={person} 
			 />
			<br></br>
			</div>
			)

		return(
			<div>
			{chef}
			<br/>
			</div>

			)

	}
}