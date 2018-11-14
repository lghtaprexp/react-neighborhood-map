import React, { Component } from 'react';
import '../App.css';

class RestaurantSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // allRestaurants: [],
      // foundRestaurants: [],
      // markers: [],
      search: ''
    }
  }

  // updateSearch = (search) => {
  //   this.setState({search});
  //   // Set marker visibility to true to show all markers
  //   this.props.markers.map((marker) => marker.setVisible(true));

  //   let allRestaurants = this.props.allRestaurants;
  //   if(search) {
  //     // To reduce error, all user input will be converted to lowercase
  //     let searchResults = allRestaurants.filter(restaurant => restaurant.venue.name.toLowerCase().includes(search.toLowerCase()));
  //     this.setState({allRestaurants: searchResults});
  //     this.props.updateRestaurant(searchResults);
  //     // Create variable to hide markers from user input
  //     // Using the every() method to check if all element in the array pass the test
  //     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  //     let hideMarkers = this.props.markers.filter(marker => searchResults.every(restaurant =>  restaurant.venue.name !== marker.title));

  //     // Loop over the markers and hide the markers that doesn't match
  //     // what the user type in search
  //     hideMarkers.forEach(marker => marker.setVisible(false));
  //   } else {
  //     // Keep markers display for results from search
      
  //     this.setState({allRestaurants: allRestaurants});
  //     // Set visibility of markers from search to visible
  //     this.props.markers.forEach(marker => marker.setVisible(true));
  //   }
  // }

  // Click event allows user to click on item from filtered list and
  // a marker correlated to the item clicked will animate
  restaurantItemClick = (item) => {
    this.props.markers.map(marker => {
      if(marker.title === item) {
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
  	      onChange={(e) => {this.props.updateSearch(e.target.value)}}
		  value={this.props.search}
  	    />
  	    <ul>
  	      {this.props.allRestaurants &&
  	       this.props.allRestaurants.map((restaurant, index) => (
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