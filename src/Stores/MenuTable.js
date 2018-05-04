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
    var menu;
    if(typeof this.props.menu === "undefined"){
      menu = []
    }
    else{
      menu = this.props.menu;
    }
    this.state = {
      menu:menu,
      addItem: this.props.addItem
    }

  }





render() {
  const addItem = this.state.addItem
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
   return <MenuTableRow  addItem={addItem} recipe = {recipe}/>
 })}

 </TableBody>
</Table>
  );
}
}

export default MenuTable;
