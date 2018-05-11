import React, { Component } from 'react';
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
      menu:this.props.menu,
      addItem: this.props.addItem,
      storeName: this.props.storeName
    }

  }


render() {
  const addItem = this.state.addItem
  const storeName = this.state.storeName
  if(typeof this.props.menu !== 'undefined'){
    return (
      <Table>
   <TableHeader>
        <TableHeaderColumn></TableHeaderColumn>
       <TableHeaderColumn>Name</TableHeaderColumn>
       <TableHeaderColumn>Price</TableHeaderColumn>
       <TableHeaderColumn>Rating</TableHeaderColumn>
       <TableHeaderColumn>Description</TableHeaderColumn>
   </TableHeader>

   <TableBody>
    {this.props.menu.map(function(recipe){
     return <MenuTableRow  addItem={addItem} recipe = {recipe} storeName = {storeName}/>
   })}

   </TableBody>
  </Table>
    );
  }
  else{
    return(
    <h1 style={{display: 'flex', justifyContent: 'center'}}> Nothing on menu yet!</h1>
    );
  }
}

}

export default MenuTable;
