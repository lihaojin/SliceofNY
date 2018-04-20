import React, { Component } from 'react';
import MapPage from '../MapComponents/CustomerMap/MapPage'
import TopThreeTable from './TopThreeTable'
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
    <TopThreeTable/>
    </div>
    );
  }
}

export default App;
