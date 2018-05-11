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
  return (
    <Table>
 <TableHeader>
      <TableRowColumn></TableRowColumn>
     <TableRowColumn>Name</TableRowColumn>
     <TableRowColumn>Price</TableRowColumn>
     <TableRowColumn>Rating</TableRowColumn>
     <TableRowColumn>Description</TableRowColumn>
 </TableHeader>

 <TableBody>
 {(typeof this.props.menu !== 'undefined') && this.props.menu.map(function(recipe){
   return <MenuTableRow  addItem={addItem} recipe = {recipe} storeName = {storeName}/>
 })}

 </TableBody>
</Table>
  );
}
}

export default MenuTable;
