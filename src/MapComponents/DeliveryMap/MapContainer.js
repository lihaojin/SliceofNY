import React, { Component } from 'react';
import {Google,GoogleMap,withGoogleMap,withScriptjs,Map,DirectionsRenderer,Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import pizzaBox from './images/pizza-box-clipart-1.png'
import bike from './images/bike.jpg'
import Geocode from "react-geocode";
import axios from 'axios'
import App from './Map-Vehicles-React/src/index'


export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [] ,
        directions: [],
        pathCoordinates:[ 
          {lat: 40.758896, lng:-73.985130},
          {lat:50.1, lng:1.1},
        ] 
    }
  }

  //creates marker array and other state variables
  componentDidMount(){
    this.setState({
      markers: [{lat: 40.758896, lng: -73.985130,img_src: pizzaBox, storeName: "Hello Pizza", currentLocation: true}],
      currentLocationMarkerIndex: 0,
    });
  }

  //Adds current location marker
  addMarker(lati,long){
    if(!this.state.addedCurrent){
      this.setState({currentLocationMarkerIndex: this.state.markers.length});
      var joined = this.state.markers.concat({lat: lati, lng: long,img_src: bike, currentLocation: true});
      this.setState({
        markers: joined
      });  
      this.setState({addedCurrent: true});
      this.setState({showPrompt: false});
      this.forceUpdate();
      
    }
  }

  //Removes current location marker
  removeCurrent(){
    if(this.state.addedCurrent){
      var remove = this.state.markers
      remove.splice(this.state.currentLocationMarkerIndex);
      this.setState({markers: remove});
      this.setState({addedCurrent: false});
      this.setState({showPrompt: true});
      this.forceUpdate();
      
    }
  }

  apiIsLoaded = (map, maps) => {
  if (map) {
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    directionsService.route({
        origin: 'Boston, MA',
        destination: 'Vancouver, BC',
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.setState({directions: response.routes});
          console.log(response.routes[0])
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  

  }


  
  static defaultProps = {
    center: {lat: 40.758896, lng: -73.985130},
    zoom: 11,
    style: {width: '50%', height: '50%'}
  };

 
  render() {
    return (
      <div>
       <App />
      </div>
      

    );
  }
}
