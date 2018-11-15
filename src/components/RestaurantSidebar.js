import React, { Component } from 'react';
import '../App.css';

class RestaurantSidebar extends Component {

  render() {
    return (
      <div role="application" id="sidebar">
        <label>Find A Restaurant</label>
        <input
          aria-label="Restaurant Filter"
          type="text"
          placeholder="Filter Restaurant By Name"
          onChange={(e) => {this.props.updateSearch(e.target.value)}}
          value={this.props.search}
        />
        <ul>
          {this.props.foundRestaurants &&
           this.props.foundRestaurants.map((restaurant, index) => (
           <li
           className="item"
           key={index}
           role="menuitem"
           aria-label="Restaurant"
           onClick={() => {this.props.restaurantItemClick(restaurant.name)}}>
           <button key={index}>{restaurant.name}</button>
         </li>))}
        </ul>    
      </div>
  )
  }
}

export default RestaurantSidebar;