import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PizzaMarker from './marker'
import pizza from './images/pizza.png'
import pink_circle from './images/pink-circle.png'
import Geocode from "react-geocode";
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'



export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: []
    }
  }

  //creates marker array and other state variables
  componentDidMount(){
    this.setState({
      markers: [{lat: 40.758896, lng: -73.985130,img_src: pizza, storeName: "Hello Pizza", currentLocation: false}],
      currentLocationMarkerIndex: -1,
      addedCurrent: false,
      showPrompt: true
    });
  }

  //Adds current location marker
  addMarker(lati,long){
    if(!this.state.addedCurrent){
      this.setState({currentLocationMarkerIndex: this.state.markers.length});
      var joined = this.state.markers.concat({lat: lati, lng: long,img_src:pink_circle , currentLocation: true});
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

  //Gets lat and lng from address using geocode library
  getAddress(index){
    Geocode.enableDebug();
    var coords, update;
    Geocode.fromAddress("Empire State Building").then ( response => {
        coords = response.results[0].geometry.location;
        update = this.state.markers;

        update[index].lat = coords[0];
        update[index].lng = coords[1];
        this.setState({markers: update});
        
      },
      error => {
        console.error(error);
      }
    );
  }


  //In development should eventually return three best matches
  returnRelevantMarker(){
    var x = this.state.markers;
    var update, coord;
    console.log('hello');
    axios.get('http://localhost:3001/store/getAllStore').then(response => {
      for(var i = 0; i < response.data.length; i++){
          var update = this.state.markers;
          update = update.concat({lat: 40.73, lng: -73.8, img_src: pizza, storeName: response.data[i].name, currentLocation: false});
          this.setState({markers:update});
        
      }
      
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
    this.forceUpdate();
  }
  


  static defaultProps = {
    center: {lat: 40.758896, lng: -73.985130},
    zoom: 11
  };

 
  render() {
    return (
      <div>
      {this.state.showPrompt && (<div className="InitialPrompt" style={{color:"white"}}>Please Click Your Current Location </div>)}
      <div style={{width: '100%', height: '400px', border: '10px double white'}}> 
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIQZMVYWhDwlR9mqBRL-dOGxW3LwLV-ds' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onClick = {({x, y, lat, lng, event}) => this.addMarker(lat,lng)}
      >

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
      </div>
      <div className="text-center">
        <RaisedButton className="button" onClick = {this.returnRelevantMarker.bind(this)}> Show All </RaisedButton>
        <RaisedButton className="button"> Show Relevant </RaisedButton>
        <RaisedButton className="button" onClick = {this.removeCurrent.bind(this)}> Reset Current </RaisedButton>
        </div>
      </div>


    );
  }x
}