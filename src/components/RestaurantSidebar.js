import React, { Component } from 'react';
import '../App.css';

class RestaurantSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundRestaurants: this.props.allRestaurants,
      search: ''
    }
  }

  // Filter and search for restaurant from the sidebar
  updateSearch = (search) => {
    // Set marker visibility to true to show all markers
    // Create a list of found restaurant from all the
    // restaurants in the area    
    // To reduce error, all user input will be converted to lowercase
    let searchResults = this.props.allRestaurants.filter(restaurant => restaurant.venue.name.toLowerCase().includes(search.toLowerCase()));
    // Set the result of foundRestaurants to the filtered
    // search result

    // Use a loop to set visibility of markers
    // base on what the user input in search bar
    this.props.markers.forEach(marker => {
    if(marker.name.toLowerCase().includes(search.toLowerCase())) {
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
    // console.log(marker);
    });
    this.setState({foundRestaurants: searchResults, search});
    console.log(this.foundRestaurants)    
  }

  // Click event allows user to click on item from filtered list and
  // a marker correlated to the item clicked will animate
  restaurantItemClick = (item) => {
    this.props.markers.map(marker => {
      if(marker.name === item) {
        window.google.maps.event.trigger(marker, "click")
      }
    })
  }

  render() {
    return (
      <div role="application" id="sidebar">
        <label>Find A Restaurant</label>
  	    <input
  	      aria-label="Restaurant Filter"

  	      type="text"
  	      placeholder="Filter Restaurant By Name"
  	      onChange={(e) => {this.updateSearch(e.target.value)}}
		  value={this.state.search}
  	    />
  	    <ul>
  	      {this.state.foundRestaurants &&
  	       this.state.foundRestaurants > 0 && 
  	       this.state.foundRestaurants.map((restaurant, index) => (
		     <li
			   className="item"
			   key={index}
			   role="menuitem"
			   aria-label="Restaurant"
			   onClick={() => {this.restaurantItemClick(restaurant.venue.name)}}>
			   <button key={index}>{restaurant.venue.name}</button>
			 </li>))}
  	    </ul>    
  	  </div>
	)
  }
}

export default RestaurantSidebar;