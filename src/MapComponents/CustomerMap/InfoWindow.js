import React, { Component } from 'react';

export default class InfoWindow extends Component{
	constructor(props){
		super(props);
		this.setState({
			link: this.props.link,
			name: this.props.name,
			location: this.props.location
		})

	}


	render(){
		return(
			<div class="city">
			{this.props.link} <br/>
			{this.props.name} <br/>
			{this.props.location} <br/>
			</div>
			
			
			

			);

	}
}