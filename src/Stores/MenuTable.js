import React, { Component } from 'react';
import {GetMenu} from '../Utils/Requests/GetStoreInfo';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MenuTableRow from './MenuTableRow';

class MenuTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu:[]
    }
  }

  componentDidMount(){
    var passName = this.props.match.params.name;
    GetMenu(this.state.name)
    .then(response => {
      this.setState({menu:response.data[0]});
    })
    .catch(error => {
      alert("Error" + error);
    })
  }

render() {
  return (
    <Table>
 <TableHeader>
   <TableRow>
     <TableHeaderColumn>Name</TableHeaderColumn>
     <TableHeaderColumn>Price</TableHeaderColumn>
     <TableHeaderColumn>Rating</TableHeaderColumn>
     <TableHeaderColumn>Description</TableHeaderColumn>
   </TableRow>
 </TableHeader>

 <TableBody>
 {this.state.menu.map(function(recipe){
   return <MenuTableRow recipe = {recipe}/>
 })}
 </TableBody>
</Table>
  );
}
}

export default MenuTable;
