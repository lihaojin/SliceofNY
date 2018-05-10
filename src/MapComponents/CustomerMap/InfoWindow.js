import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
      display: 'inline-block',
      height: {flex:3},
      width: {flex:3},
      margin: 20,
      padding: 10,
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
			<div style = {{color: 'white'}}>
			{this.props.name} <br/>
			{this.props.address} <br/>
			<Link to={this.props.link} >
           <RaisedButton>
            Visit
           </RaisedButton>
          </Link>
			</div>
			</Paper>
			
			
			

			);

	}
}