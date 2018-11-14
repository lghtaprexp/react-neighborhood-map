import React, { Component } from 'react';
import '../App.css';
// <div className="container">
//         <header>
//           <span className="menu fas fa-bars"></span>
//           <h1>Thai Food - Simi Valley, CA</h1>
//         </header>
//         <RestaurantList 
//           allRestaurants={this.state.allRestaurants}
//           markers={this.state.markers}
//           searchedRestaurant={this.searchedRestaurant}
//         />
//         <div id="map"></div>
//       </div>

class Map extends Component {

 render() {
    return (
      <div id="map" role="application" aria-label="map"></div>
      )
  }
}

export default Map