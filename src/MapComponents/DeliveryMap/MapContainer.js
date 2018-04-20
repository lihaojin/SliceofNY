import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Polyline from 'google-map-react';
import PizzaMarker from './marker'
import pizzaBox from './images/pizza-box-clipart-1.png'
import bike from './images/bike.jpg'
import Geocode from "react-geocode";
import axios from 'axios'



export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [] ,
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
          //this.setState({polyline: response.routes});
          console.log(response.routes[0])
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  

  }


  
  static defaultProps = {
    center: {lat: 40.758896, lng: -73.985130},
    zoom: 11
  };

 
  render() {
    return (
      <div style={{width: '100%', height: '400px'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIQZMVYWhDwlR9mqBRL-dOGxW3LwLV-ds' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onClick = {({x, y, lat, lng, event}) => this.addMarker(lat,lng)}
        onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        yesIWantToUseGoogleMapApiInternals = {true}
      >
        <Polyline
          path = {this.state.polyline}
          options={{ 
          strokeColor: '#00ffff',
          strokeOpacity: 1,
          strokeWeight: 2,
          icons: [{ 
          icon: "hello",
          offset: '0',
          repeat: '10px'
          }],
          }}
          />
        {this.state.markers.map((marker, i) =>{
              return(
                <PizzaMarker
                  key={i}
                  lat={marker.lat}
                  lng={marker.lng}
                  img_src={marker.img_src}
                  onClick={() => this.handleToggleClose()}
                  name = {marker.storeName}
                >

                </PizzaMarker>

              )
            })}
        
      </GoogleMapReact>
      <div className="text-center">
        <button className="button"> Next Order </button>
        <button className="button"> Show Route </button>
        <button className="button" onClick = {this.removeCurrent.bind(this)}> Reset Current </button>
        </div>
      </div>

    );
  }
}