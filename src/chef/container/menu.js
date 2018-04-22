
import React, { Component } from 'react';
import Test from '../components/test';

export default class ShowMenu extends Component{

	

  render() {
  	const names = [ 'Jack','John','Jonny']
  	const final = names.map((name)=> <Test  key={name.toString()} name={name} />);
    return (<ul type="none"> {final} </ul>);
  }

}