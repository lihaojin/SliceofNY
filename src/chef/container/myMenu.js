
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuCard from '../components/menu';
import {getMenu} from '../Util/chefDBUtil';
import { Redirect } from 'react-router';

export default class MyMenu extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			recipes:[],
			redirect:false
		}
	}

	componentDidMount(){

		if(localStorage.getItem('token')==null)
		{	
			this.setState({redirect:true});
			alert("You are not logged in!");
		}
		else{

		  getMenu().then( result=>{

		  	 this.setState({
		  		recipes: result.data.recipe,
		  		redirect:false
		  		})
		  	}).catch(error=>{
		  		console.log("error in myMenu DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});
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
		console.log("State ",this.state.recipes)
		const content = this.state.recipes.map((recipe)=>
			<div key={recipe.toString()}>
			<br></br>
			<MenuCard title={recipe.name} price={recipe.price} description={recipe.description} id={recipe["_id"]} />
			<br></br>
			</div>
			)

		return(
			<div>
			{content}
			</div>

			)
	}
}