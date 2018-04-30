import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Top3tableRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
    }
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(e){
          const value = e.target.value;
          const name = e.target.name;
          this.setState({[name]: value})
      }

    render() {
      return(
        <TableRow>
          <TableRowColumn>{this.props.store.name}</TableRowColumn>
          <br />
          <TableRowColumn>{this.props.store.rating}</TableRowColumn>
          <TableRowColumn>
          <Link to={'/'+ this.props.store.name +'/StorePage'}>VISIT</Link> 
          </TableRowColumn>
        </TableRow>
      )
    }
}
export default Top3tableRow;
