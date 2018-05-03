import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ListRow extends Component {
    constructor(props){
      super(props);
      this.state = {
        recipe: this.props.recipe,
      }
    }
    render() {
      return(
        <TableRow>
          <TableRowColumn>{this.props.recipe.name}</TableRowColumn>
          <TableRowColumn>{this.props.recipe.price}</TableRowColumn>
        </TableRow>
      )
    }
}
export default ListRow;
