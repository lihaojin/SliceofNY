
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {addRecipe} from '../Util/chefDBUtil';
import {style} from '../components/style';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


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
		alert("Recipe Added!");
		window.location.reload();
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
	      <ValidatorForm
                ref="form"
                onSubmit={this.submitRecipe}
                onError={errors => console.log(errors)}
                style={style}
            >
	      <h2 style={style.h2}>Recipe</h2>
	      <TextValidator
	      value={this.state.name}
	      name="name"
	      onChange={(e)=> this.handleTextEntry(e)}
	      floatingLabelText="Name"
	      type="text"
	      validators={['required']}
	      errorMessages={['this field is required']}
	      floatingLabelStyle ={style.floatingLabelStyle}
	      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
	      inputStyle={style.inputStyle}
	    /><br />


	      <TextValidator
	      value={this.state.price}
	      name="price"
	      onChange={(e)=> this.handleTextEntry(e)}
	      floatingLabelText="Price"
	      type="text"
	      validators={['required']}
	      errorMessages={['this field is required']}
	      floatingLabelStyle ={style.floatingLabelStyle}
	      floatingLabelFocusStyle={style.floatingLabelFocusStyle}
	      inputStyle={style.inputStyle}
	    /><br />

	      <TextValidator
	      hintText="Description of the Recipe..."
	      multiLine={true}
	      rows={8}
	      validators={['required']}
	      errorMessages={['this field is required']}
	      value={this.state.description}
	      name="description"
	      onChange={(e) => this.handleTextEntry(e)}
	      type="text"
	      inputStyle={style.inputStyle}
	    /><br />

	    <RaisedButton type="submit" label="Submit"/>

	      </ValidatorForm>
	      </center>
    </div>
    );
  }
}




