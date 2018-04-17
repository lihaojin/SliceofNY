import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PizzaMarker from './marker'
import pizza from './images/pizza.png'
import pink_circle from './images/pink-circle.png'



export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [],
    }
  }

  componentDidMount(){
    this.setState({
      markers: [{lat: 40.758896, lng: -73.985130,img_src: pizza, currentLocation: false}],
      currentLocationMarkerIndex: -1,
      addedCurrent: false,
      showPrompt: true
    });
  }

  addMarker(lati,long){
    if(!this.state.addedCurrent){
      this.state.currentLocationMarkerIndex = this.state.markers.push({lat: lati, lng: long,img_src:pink_circle , currentLocation: true}) - 1; 
      this.state.addedCurrent=true;
      this.state.showPrompt= false;
      this.forceUpdate();
      
    }
  }

  removeCurrent(){
    if(this.state.addedCurrent){
      this.state.markers.splice(this.state.currentLocationMarkerIndex);
      this.state.addedCurrent=false;
      this.state.showPrompt=true;
      this.forceUpdate();
      
    }
  }

  returnRelevantMarker(){
    //Call to API
    //populate markers array
    this.forceUpdate()
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
      >
      
        {this.state.markers.map((marker, i) =>{
              return(
                <PizzaMarker
                  key={i}
                  lat={marker.lat}
                  lng={marker.lng}
                  img_src={marker.img_src}
                  onClick={() => this.handleToggleClose()}
                >

                </PizzaMarker>

              )
            })}
        
      </GoogleMapReact>
      <div class="text-center">
        <button className="button" > Show All </button>
        <button className="button"> Show Relevant </button>
        <button className="button" onClick = {this.removeCurrent.bind(this)}> Reset Current </button>
        </div>
        {this.state.showPrompt && (<div class="InitialPrompt">Please Click Your Current Location </div>)}
      </div>

    );
  }
}