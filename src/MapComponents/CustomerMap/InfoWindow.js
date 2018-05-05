import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
      display: 'inline-block',
      height: {flex:1},
      width: {flex:2},
      margin: 20,
      padding: 40,
      textAlign: 'center',
      backgroundColor:'rgba(20,20,20,0.7)',
      floatingLabelStyle: {
        color: 'white',
      },
      floatingLabelFocusStyle: {
        color: 'white',
      },
      inputStyle:{
        color: 'white',
      }
    }

export default class InfoWindow extends Component{
	constructor(props){
		super(props);
		this.setState({
			link: this.props.link,
			name: this.props.name,
			address: this.props.address
		})

	}


	render(){
		return(
			<Paper style={style} zDepth={3}>
			<div class="city">
			{this.props.link} <br/>
			{this.props.name} <br/>
			{this.props.address} <br/>
			</div>
			</Paper>
			
			
			

			);

	}
}