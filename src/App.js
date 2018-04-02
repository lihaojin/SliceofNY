import React from 'react';
import AppBar from 'material-ui/AppBar' ;
import RoutePaths from './routes/RoutePaths';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

export default class App extends React.Component {

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
    map.data.loadGeoJson(
      'https://storage.googleapis.com/mapsdevsite/json/google.json');
  }

  render() {
    const style = {
      backgroundColor:'black',
    }

    return (
      <MuiThemeProvider>
      <AppBar title='Slice of NY' style={style}/>
      <RoutePaths/>
      <div id='app'>
        <div id='map' />
      </div>
      </MuiThemeProvider>
    );
  }
};
