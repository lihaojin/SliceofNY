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
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {sendComplaint} from '../manager/Util/managerDBUtil';

const baseURL = "http://localhost:3001";

class Top3tableRow extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleComplaintEasy= this.handleComplaintEasy.bind(this);
  }

  
  handleFormChange(e){
          const value = e.target.value;
          const name = e.target.name;
          this.setState({[name]: value})
      }

  handleSignUp(){
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);

    if(decoded !== null){
    alert(this.props.store.name)
    axios.post(baseURL + '/store/signup/' + this.props.store.name)
    .then((result) => {
      alert("success");
    }).catch((error) =>{
      alert(error);
    })
  }
  else{
    alert("Sign In First");
  }

    
  }
  handleComplaintEasy(){
    const complaint = prompt("Please enter your complaint: ");
    sendComplaint(this.props.store.name,complaint)
    .then(result=>
    {
      alert("Success\n",result.data.message);
      window.location.reload();
    })
    .catch(err=>
    {
      alert("Failed!");
    });

  }
    render() {
      return(
        <TableRow>
          <TableRowColumn>{this.props.store.name}</TableRowColumn>
          <br />
          <TableRowColumn>{this.props.store.rating}</TableRowColumn>
          <TableRowColumn>
          <Link to={'/'+ this.props.store.name +'/StorePage'} >
           <RaisedButton>
            Visit
           </RaisedButton>
          </Link>
          </TableRowColumn>
          <TableRowColumn>
           <RaisedButton onClick={this.handleSignUp.bind(this)}>
            Sign Up
           </RaisedButton>
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton onClick={this.handleComplaintEasy}>
            Comment/Complaints
           </RaisedButton>
          </TableRowColumn>
        </TableRow>
      )
    }
}
export default Top3tableRow;
