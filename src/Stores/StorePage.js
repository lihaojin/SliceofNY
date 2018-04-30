import React, { Component } from 'react';
import MenuTable from './MenuTable'
import {GetMenu} from '../Utils/Requests/GetStoreInfo';
class StorePage extends Component {
  componentDidMount(){
    var passName = this.props.match.params.name;
    GetMenu(passName)
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
      <MenuTable/>
      </div>
    );
  }
}

export default StorePage;
