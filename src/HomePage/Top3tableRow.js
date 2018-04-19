import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Top3tableRow extends Component {
    render() {
      return(
        <TableRow>
          <TableRowColumn>{this.props.store.name}</TableRowColumn>
          <TableRowColumn>{this.props.store.rating}</TableRowColumn>
        </TableRow>
      )
    }
}
export default Top3tableRow;
