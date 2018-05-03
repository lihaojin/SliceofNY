import Rating from 'react-rating';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';

const style = {
  formStyle: {
  display: 'inline-block',
  height: {flex:1},
  width: {flex:2},
  margin: 20,
  padding: 40,
  textAlign: 'center',
  backgroundColor:'rgba(20,20,20,0.7)'
  },
}


export default class Ratings extends Component{
	constructor(props){
		super(props)
	}

	handleRating(value){
		this.props.handleRating(value)
	}

	render(){
		return(
        		<Paper style={style.formStyle} zDepth={3}>
        			<h1 style={{color:'white'}}> Please Rate the Customer! </h1>
          			<Rating onChange={this.handleRating.bind(this)}/>
          		</Paper>
			);
	}
}