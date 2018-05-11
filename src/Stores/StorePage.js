import React, { Component } from 'react';
import MenuTable from './MenuTable'
import {GetMenu} from '../Utils/Requests/GetStoreInfo';
import RaisedButton from 'material-ui/RaisedButton'

class StorePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      menu : [],
      storeName : this.props.match.params.name
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
      <MenuTable addItem={this.props.addItem} menu={this.state.menu} storeName = {this.state.storeName}/>
      <br />
      <br />
      <RaisedButton href='/Homepage' labelColor='white' label='Go Back' primary={true} style={{display: 'flex',justifyContent: 'center'}}/>
      </div>
    );
  }
}

export default StorePage;
