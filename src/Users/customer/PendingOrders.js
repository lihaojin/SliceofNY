import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import PendingOrdersRow from './PendingOrdersRow'

class PendingOrders extends Component {
  render () {
    return(
      <Table>
      <TableHeader>
      <TableHeaderColumn>Order No.</TableHeaderColumn>
      <TableHeaderColumn>Store Name</TableHeaderColumn>
      <TableHeaderColumn></TableHeaderColumn>
      </TableHeader>

      <TableBody>
      <PendingOrdersRow/>
      </TableBody>
      </Table>
    );
  }
}

export default PendingOrders;
