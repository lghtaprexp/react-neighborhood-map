import React, { Component } from 'react';
import '../App.css';

class RestaurantSidebar extends Component {

  render() {
    return (
      <div id="sidebar" aria-label="Search Bar" role="search">
        <label className="sidebarTitle">Find A Restaurant</label>
        <input
          aria-label="Restaurant Filter"
          className="inputFilter"
          type="text"
          placeholder="Search By Name"
          onChange={(e) => {this.props.updateSearch(e.target.value)}}
          value={this.props.search}
        />
        {this.props.foundRestaurants &&
         this.props.foundRestaurants.map((restaurant, index) => (
          <ul
            className="listItem"
            key={index}
            role="menuitem"
            aria-label="Restaurant"
            onClick={() => {this.props.restaurantItemClick(restaurant.name)}}>
            <li key={index}>{restaurant.name}</li>
          </ul>))}
      </div>
  )
  }
}

export default RestaurantSidebar;