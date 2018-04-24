import React, { Component } from 'react';
import MapPage from '../MapComponents/CustomerMap/MapPage'
import TopThreeTable from './TopThreeTable'
import ShowAllTable from './ShowAllTable'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class App extends Component {

  render() {

    return (
      <div>
    <MapPage />
    <br /><br />
    <h1>Top 3 Stores</h1>
    <TopThreeTable/>
    <br /><br />
    <h1>All Stores</h1>
    <ShowAllTable/>
    </div>
    );
  }
}

export default App;
