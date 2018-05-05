import React, { Component } from 'react';
import InfoWindow from './InfoWindow'

export default class PizzaMarker extends Component{
  constructor(props){
      super(props)
      console.log(this.props.address);
      this.state = {
          showInfo: false,
          link: "youtube",
          name: this.props.name,
          address: this.props.address

      }
    }

    onClickMarker(){
      this.setState({showInfo: !this.state.showInfo})
    }

  render(){
    return(
      <div onClick={this.onClickMarker.bind(this)}><img src={this.props.img_src} className="PizzaMarker"  width = "20" height = "20" style={{}} /> {this.state.showInfo && (
              <div>
                <div><InfoWindow 
                link= {this.state.link}
                name= {this.state.name}
                address = {this.state.address}
                />
                </div>
              </div>
            )} 
      </div>
      );
  }
}