
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {addRecipe} from '../Util/chefDBUtil';
import {style} from '../components/style';


export default class AddMenu extends Component{
 constructor(props) {
    super(props);
    this.state = {
  		name:'',
  		price:'',
  		description:''
		};

	this.handleTextEntry = this.handleTextEntry.bind(this);
	this.submitRecipe = this.submitRecipe.bind(this);
  }

  handleTextEntry(e){
	const value = e.target.value
    const name = e.target.name;
  	this.setState({
  		[name]:value
  	})
  }

  submitRecipe(){
  	addRecipe(this.state.name,this.state.price,this.state.description)
  	.then(response=>
	{
		alert(response.message);
	})
  	.catch(error=>
  	{
  		alert(error.message);
  	});
  }

render() {
    return (
   	<div>
	      <center>
	      <Paper style={style.formStyle} zDepth={1}>
	      <h2>Recipe</h2>
	      
	      <TextField
	      value={this.state.name}
	      name="name"
	      onChange={(e)=> this.handleTextEntry(e)}
	      floatingLabelText="Name"
	      type="text"
	      floatingLabelStyle ={style.floatingLabelStyle}
	      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
	      inputStyle={style.inputStyle}
	    /><br />


	      <TextField
	      value={this.state.price}
	      name="price"
	      onChange={(e)=> this.handleTextEntry(e)}
	      floatingLabelText="Price"
	      type="text"
	      floatingLabelStyle ={style.floatingLabelStyle}
	      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
	      inputStyle={style.inputStyle}
	    /><br />

	      <TextField
	      hintText="Description of the Recipe..."
	      multiLine={true}
	      rows={8}
	      value={this.state.description}
	      name="description"
	      onChange={(e) => this.handleTextEntry(e)}
	      type="text"
	      inputStyle={style.inputStyle}
	    /><br />

	    <RaisedButton onClick = {this.submitRecipe} label="Submit"/>

	      </Paper>
	      </center>
    </div>
    );
  }
}




