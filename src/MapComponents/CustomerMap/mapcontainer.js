import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PizzaMarker from './marker'
import pizza from './images/pizza.png'
import grey_marker from './images/marker.png'
import Geocode from "react-geocode";
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import './Map.css'
import geolib from 'geolib';

const btn_style={
  padding:'10px'
}

const baseURL = "http://localhost:3001";

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
      currentLocationMarkerIndex: -1,
      addedCurrent: false,
      showPrompt: true
    });
  }

  //Adds current location marker
  addMarker(lati,long){
    if(!this.state.addedCurrent){
      var joined = this.state.markers.concat({lat: lati, lng: long,img_src:grey_marker , currentLocation: true});
      this.setState({
        currentLocationMarkerIndex: this.state.markers.length,
        markers: joined,
        addedCurrent: true,
        showPrompt: false
      });  
  
      this.forceUpdate();
      
    }
  }

  //Removes current location marker
  removeCurrent(){
    console.log(this.state.markers)
    if(this.state.addedCurrent){
      this.setState({markers: []});
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

  haversineDistance(coords1, coords2) {
    var distance =  geolib.getDistance(
      {latitude: coords1[0], longitude: coords1[1]},
      {latitude: coords2[0], longitude: coords2[1]}
    );
    //console.log({latitude: coords1[0], longitude: coords1[1]});
    //console.log({latitude: coords2[0], longitude: coords2[1]})
    return distance;

  }

  compare(a,b) {
    //console.log(a.distance,b.distance);
  if (a.distance < b.distance)
    return -1;
  if (a.distance >b.distance)
    return 1;
  return 0;
}
  

  async sortTopThree(update){
    var mark = this.state.markers[this.state.currentLocationMarkerIndex];
    var current = [mark.lat, mark.lng]
    var indices_sorted = []
    var list = []
    for(var i = 0; i < update.length; i++){
      var distance = await this.haversineDistance(current,update[i]);
      console.log(distance);
      list.push({distance: distance, index: i})
      
    }

    var sorted = list.sort(this.compare);
    return sorted.slice(0,3)      // bar,me,you,foo

  }
  //In development should eventually return three best matches, makes two calls to two different apis
  //Takes in end of api route as argument so can be used for both show all and relevant

  //Rewrite !!
  async returnRelevantMarker(){
    if(this.state.addedCurrent){
      Geocode.enableDebug();
      var x = this.state.markers;
      var y = x[this.state.currentLocationMarkerIndex];
      this.setState({
        currentLocationMarkerIndex: 0
      })
      var update = [y]
      var coords,name,address;
      var list_coords = []
      var response = await axios.get('http://localhost:3001/store/getAllStore')
        for(var i = 0; i < response.data.length; i++){
          var loc = await Geocode.fromAddress(response.data[i].location)
          var coords =  [loc.results[0].geometry.location.lat,loc.results[0].geometry.location.lng];
          list_coords.push(coords)

        }
      console.log('ready');
      var topThree = await this.sortTopThree(list_coords);
      for(var i = 0; i < topThree.length; i++){
        var newMarkerProto = response.data[topThree[i].index]
        var coordsNew = list_coords[topThree[i].index]
        var newMarker = {lat: coordsNew[0], lng: coordsNew[1],address: newMarkerProto.location, name: newMarkerProto.name,img_src:pizza , currentLocation: false}
        update.push(newMarker)
      }
       await this.setState({
        markers: update
      })
      console.log(this.state.markers)
    }
    else{
      alert('Please Click Your Location on the Map!')
    }
    
  }

  async returnAll(){
    if(this.state.addedCurrent){
      Geocode.enableDebug();
      var x = this.state.markers;
      var y = x[this.state.currentLocationMarkerIndex];
      this.setState({
        currentLocationMarkerIndex: 0
      })
      var update = [y]
      var coords,name,address;
      var list_coords = []
      var response = await axios.get('http://localhost:3001/store/getAllStore')
        for(var i = 0; i < response.data.length; i++){
          var loc = await Geocode.fromAddress(response.data[i].location)
          var coords =  [loc.results[0].geometry.location.lat,loc.results[0].geometry.location.lng];
          var data = response.data[i]
          var newMarker = {lat: coords[0], lng: coords[1],address: data.location, name: data.name,img_src:pizza , currentLocation: false}
          update.push(newMarker)

        }
      this.setState({
        markers: update
      })
    }
    else{
      alert('Please Click Your Location on the Map!')
    }
  }


  static defaultProps = {
    center: {lat: 40.758896, lng: -73.985130},
    zoom: 11
  };

 
  render() {
    return (
      <div>
      {this.state.showPrompt && (<h1 className="InitialPrompt" style={{color:"white"}}>Please Click Your Current Location </h1>)}
      {!this.state.showPrompt && (<h1 className="InitialPrompt" style={{color:"white"}}>Current Location is Pink!</h1> )}
      <div style={{width: '100%', height: '400px', border: '5px groove white'}}> 
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
                  address={marker.address}
                  img_src={marker.img_src}
                  onClick={() => this.handleToggleClose()}
                  name = {marker.name}
                  isCurrent = {marker.currentLocation}
                >

                </PizzaMarker>

              )
            })}
        
      </GoogleMapReact>
      </div>
      <div className="text-center">
        <RaisedButton className="button" primary={true} onClick = {() => this.returnRelevantMarker()}> Show Relevant </RaisedButton>
        <RaisedButton className="button" onClick = {() => this.returnAll()} > Show All </RaisedButton>
        <RaisedButton className="button" secondary={true} onClick = {this.removeCurrent.bind(this)}> Reset </RaisedButton>
        </div>
      </div>


    );
  }x
}