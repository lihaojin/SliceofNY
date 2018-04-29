
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuCard from '../components/menu';
import {getMenu} from '../Util/chefDBUtil';
import {getMenuStore} from '../../manager/Util/managerDBUtil';
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

			if(this.props.type==="Chef"){

				getMenu().then( result=>{
				 console.log("Chef Menu result: "+result.data.recipe);
			  	 this.setState({
			  		recipes: result.data.recipe,
			  		redirect:false
			  		})
			  	}).catch(error=>{
			  		console.log("error in Chef myMenu DB Retrieval: ",error);
			  		alert("Error ",error);

			  	});
		  	}
		  	if(this.props.type==="Manager")
		  	{

				getMenuStore().then( result=>{
					let allMenu = []
					if(result.data){
						for(let i = 0; i<result.data.length; ++i)
						{
							if(result.data[i])
							{
								for(let j = 0; j<result.data[i].length;++j)
								{
									console.log("Data Present in i,j : ",result.data[i][j])
									allMenu.push(result.data[i][j]);
								}
							}
						}
					}
					
					console.log(allMenu);

				 console.log("Manager Menu result: "+result);
			  	 this.setState({
			  		recipes: allMenu,
			  		redirect:false
			  		})
			  	}).catch(error=>{
			  		console.log("error in Chef myMenu DB Retrieval: ",error);
			  		alert("Error ",error);

			  	});
		  	}
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