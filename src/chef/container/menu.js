
import React, { Component } from 'react';
import Test from '../components/test';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {addRecipe} from '../Util/chefDBUtil';




export default class ShowMenu extends Component{
 constructor(props) {
    super(props);
    this.state = {
  		name:'',
  		price:'',
  		description:''
		};

	this.handleTextEntry = this.handleTextEntry.bind(this);
	this.testingOutput = this.testingOutput.bind(this);
  }

  handleTextEntry(e){
	const value = e.target.value
    const name = e.target.name;
  	this.setState({
  		[name]:value
  	})
  }

  testingOutput(){
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
	const style = {
  formStyle: {
  display: 'inline-block',
  height: {flex:100},
  width: {flex:100},
  margin: 20,
  padding: 40,
  textAlign: 'center',
  backgroundColor:'rgba(20,20,20,0.7)'
  },
  customWidth: {
  width: 250,
  },
  floatingLabelStyle: {
    color: 'white',
  },
  floatingLabelFocusStyle: {
    color: 'white',
  },
  inputStyle:{
    color: 'white',
  },
  labelStyle:{
    color:'white',
  }
};
    return (
      <Tabs>
      <Tab label="My Menu">
      </Tab>

      <Tab label="Add Menu">
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




    <RaisedButton onClick = {this.testingOutput} label="Test"/>



      </Paper>
      </center>
      </Tab>
      </Tabs>
    );
  }
}




