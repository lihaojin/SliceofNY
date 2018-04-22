
import React, { Component } from 'react';

export default class Test extends Component{

 constructor(props) {
    super(props);
    this.state = {
  		textVal:'John',
		};
  }

  handleTextEntry(e){
  	this.setState({
  		textVal:e.target.value
  	})
  }


  render() {

    return (
    	<div>
    	<input type="text" val={this.state.textVal} onChange={(e) => this.handleTextEntry(e)}/> 
    	<h1>Hello, {this.state.textVal}</h1>
    	</div>

    	);
  }

}