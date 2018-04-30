import React, { Component } from 'react';
import {GetAllStores} from '../Utils/Requests/GetAllStores';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Top3tableRow from './Top3tableRow';

class ShowAllTable extends Component {
constructor(props){
  super(props)
  this.state = {
    stores: []
  }
}


componentDidMount(){
  GetAllStores()
  .then(response => {
    this.setState({stores:response.data});
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
       <TableHeaderColumn>Rating</TableHeaderColumn>
       <TableHeaderColumn></TableHeaderColumn>
     </TableRow>
   </TableHeader>
   <TableBody>
   {this.state.stores.map(function(store){
     return <Top3tableRow store = {store}/>
   })}

   </TableBody>
 </Table>
    );
  }
}

export default ShowAllTable;
