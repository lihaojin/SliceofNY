import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PizzaMarker from './marker'
import pizza from './images/pizza.png'
import pink_circle from './images/pink-circle.png'
import Geocode from "react-geocode";
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import './Map.css'

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
      var joined = this.state.markers.concat({lat: lati, lng: long,img_src:pink_circle , currentLocation: true});
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

  //In development should eventually return three best matches, makes two calls to two different apis
  //Takes in end of api route as argument so can be used for both show all and relevant
  returnRelevantMarker(ext){
    Geocode.enableDebug();
    var x = this.state.markers;
    var update, coords,name,address;
    axios.get('http://localhost:3001/store/' + ext).then(response => {
      for(var i = 0; i < response.data.length; i++){
        var j = i
          Geocode.fromAddress(response.data[i].location).then ( loc => {
            var update = this.state.markers;
            var coords =  [loc.results[0].geometry.location.lat,loc.results[0].geometry.location.lng];
            if(typeof response.data[j].name === undefined){
              name = 'default'
            }
            else{
              name = response.data[j].name
            }
            if(typeof response.data[j].location === undefined){
              address = 'default';
            }
            else{
              address = response.data[j].location
            }
            
            if(coords !== null){
              update = update.concat({lat: coords[0], lng: coords[1], img_src: pizza, address: address, storeName: name, currentLocation: false});
            }
            this.setState({markers:update});
            this.forceUpdate();

        }).
          catch(error => {
            console.log(error)
          });
      
    }})
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
    
  }
  
  returnAll(){}


  static defaultProps = {
    center: {lat: 40.758896, lng: -73.985130},
    zoom: 11
  };

 
  render() {
    return (
      <div>
      {this.state.showPrompt && (<div className="InitialPrompt" style={{color:"white"}}>Please Click Your Current Location </div>)}
      {!this.state.showPrompt && (<div className="InitialPrompt" style={{color:"white"}}>Current Location is Pink!</div> )}
      <div style={{width: '100%', height: '400px', border: '5px solid white'}}> 
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
                  name = {marker.storeName}
                >

                </PizzaMarker>

              )
            })}
        
      </GoogleMapReact>
      </div>
      <div className="text-center">
        <RaisedButton className="button" primary={true} onClick = {() => this.returnRelevantMarker('getTop')}> Show Relevant </RaisedButton>
        <RaisedButton className="button" > Show All </RaisedButton>
        <RaisedButton className="button" secondary={true} onClick = {this.removeCurrent.bind(this)}> Reset Current </RaisedButton>
        </div>
      </div>


    );
  }x
}