import React, { Component } from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class MenuTableRow extends Component {
    render() {
      return(
        <TableRow>
          <TableRowColumn>{this.props.recipe.name}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.price}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.rating}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.description}</TableRowColumn>
        </TableRow>
      )
    }
}
export default MenuTableRow;
