import React, { Component } from 'react';
import MapPage from '../MapComponents/CustomerMap/MapPage'
import TopThreeTable from './TopThreeTable'
import ShowAllTable from './ShowAllTable'
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
      display: 'inline-block',
      height: {flex:1},
      width: {flex:2},
      margin: 20,
      padding: 40,
      textAlign: 'center',
      backgroundColor:'rgba(20,20,20,0.7)',
      floatingLabelStyle: {
        color: 'white',
      },
      floatingLabelFocusStyle: {
        color: 'white',
      },
      inputStyle:{
        color: 'white',
      }
    }

class App extends Component {

  render() {

    return (

    <div className="container">
    <center>
    <Paper style={style} zDepth={3}>
    <MapPage />
    <br /><br />
    <h1>Top 3 Stores</h1>
    <TopThreeTable/>
    <br /><br />
    <h1>All Stores</h1>
    <ShowAllTable/>
    </Paper>
    </center>
    </div>
    );
  }
}

export default App;
