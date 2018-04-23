
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuCard from '../components/menu';
import {getMenu} from '../Util/chefDBUtil';

export default class MyMenu extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			recipes:[]
		}
	}

	componentDidMount(){
		  getMenu().then(result=>{
		  	this.setState({
		  		recipes: result.data[0]
		  		})
		  	}).catch(error=>{
		  		console.log("error in myMenu DB Retrieval: ",error);
		  		alert("Error ",error);

		  	});
	}


	render()
	{
		const content = this.state.recipes.map((recipe)=>
			<div key={recipe.toString()}>
			<br></br>
			<MenuCard title={recipe.name} price={recipe.price} description={recipe.description} />
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