import React, { Component } from 'react';
import MenuTable from './MenuTable'
import {GetMenu} from '../Utils/Requests/GetStoreInfo';

class StorePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      menu : []
    }
  }
  componentDidMount(){
    GetMenu(this.props.match.params.name)
    .then(response => {
      this.setState({menu:response.data[0]});
    })
    .catch(error => {
      alert("Error" + error);
    })
  }

  render() {

    return (
      <div>
      <center><h1>Menu</h1></center>
      <br />
      <MenuTable addItem={this.props.addItem} menu={this.state.menu}/>
      </div>
    );
  }
}

export default StorePage;
