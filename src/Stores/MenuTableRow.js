import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class MenuTableRow extends Component {

    constructor(props){
      super(props);
      this.state={
        recipe :this.props.recipe
      }
    }

    render() {
      var addItem = this.props.addItem;
      return(
        <TableRow>
        <TableRowColumn>
        <FloatingActionButton onClick={() => this.props.addItem(this.props.recipe)} mini={true}>
          <ContentAdd />
        </FloatingActionButton>
        </TableRowColumn>
          <TableRowColumn>{this.props.recipe.name}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.price}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.rating}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.description}</TableRowColumn>
        </TableRow>
      )
    }
}
export default MenuTableRow;
