import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import RestaurantSidebar from './components/RestaurantSidebar';
import Map from './components/Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRestaurants: [],
      // foundRestaurants: [],
      markers: [],
      search: ''
    }
  }

  componentDidMount() {
    this.getRestaurants("thai", "Simi Valley");
  }

  // Load Google Maps script asynchronously
  loadMap = () => {
    mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB7XNQZZPAKzsm7CkomnZA5jHGB4sHfeB4&callback=initMap")
    window.initMap = this.initMap;
  }

  // Setting up search parameters to use FourSquare API
  getRestaurants = (query, location) => {
    // Get FourSquare data
    const fourSquareUrl = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "GGXCA2DKZ0EK0ID4S4SYLYTMPWFCNHOFBSBHFMOZTSJTAWX5",
      client_secret: "CKLZUO02MB5DKBQ4UCHV4Q0MT4UOV5EXPL0SPHDSE14IID4R",
      v: "20181109",
      query: query,
      near: location,
      limit: 15
    }

    // Use Axios to get restaurant data from FourSquare 
    axios.get(fourSquareUrl + new URLSearchParams(params))
    .then(results => {
      // console.log(results)
      this.setState({allRestaurants: results.data.response.groups[0].items,
                    // foundRestaurants: results.data.response.groups[0].items
                    },
                    this.loadMap);
      // console.log(this.state.allRestaurants, this.state.foundRestaurants)
    })
    .catch(error => {
      console.log("Error!", error);
    });
  }

  // Initialize map to page
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.269447, lng: -118.781479},
      scrollwheel: true,
      zoom: 13
    });
    
    // Create InfoWindow
    let InfoWindow = new window.google.maps.InfoWindow();

    // Get markers for search results from the allRestaurants array
    this.state.allRestaurants.map((restaurant) => {
      // Create marker
      let marker = new window.google.maps.Marker({
        position: {lat: restaurant.venue.location.lat, lng: restaurant.venue.location.lng},
        map: map,
        name: restaurant.venue.name,
        id: restaurant.venue.id,
        // Animate markers when map loads
        animation: window.google.maps.Animation.DROP
      })

      // Add marker to markers array
      this.state.markers.push(marker);
      // console.log(this.state.markers)

    // Create content to display within InfoWindow
     let contentString = `<h3>${restaurant.venue.name}</h3>
                          <p>${restaurant.venue.location.address}<br />
                          ${restaurant.venue.location.city}, ${restaurant.venue.location.postalCode}</p>`

    // Event listener to click on marker and open InfoWindow
    // Old InfoWindow will close when new marker is clicked
    marker.addListener('click', () => {
      // Update content of InfoWindow
      InfoWindow.setContent(contentString);

      // Open InfoWindow
      InfoWindow.open(map, marker);

      // Add animation to Markers
      // https://developers.google.com/maps/documentation/javascript/examples/marker-animations
      // Set bounce animation to two seconds
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      } setTimeout(() => {marker.setAnimation(null)}, 2000);
      });
    })
  }

  // Filter and search for restaurant from the sidebar
  // updateSearch = (search) => {
  //   this.setState({search});
  //   // Set marker visibility to true to show all markers
  //   // this.state.markers.map((marker) => marker.setVisible(true));

  //   // let allRestaurants = this.state.allRestaurants;
  //   if(search) {
  //     // To reduce error, all user input will be converted to lowercase
  //     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  //     let searchResults = this.state.allRestaurants.filter(restaurant => restaurant.venue.name.toLowerCase().includes(search.toLowerCase()));
  //     this.setState({foundRestaurants: searchResults});
  //     // this.updateRestaurant(searchResults);
  //     // Create variable to hide markers from user input
  //     // Using the every() method to check if all element in the array pass the test
  //     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  //     let hideMarkers = this.state.markers.filter(marker => searchResults.every(restaurant =>  restaurant.venue.name !== marker.name));

  //     // Loop over the markers and hide the markers that doesn't match
  //     // what the user type in search
  //     hideMarkers.forEach(marker => marker.setVisible(false));
  //   } else {
  //     // Keep markers display for results from search
      
  //     this.setState({foundRestaurants: this.state.allRestaurants});
  //     // Set visibility of markers from search to visible
  //     this.state.markers.forEach(marker => marker.setVisible(true));
  //   }
  // }

  // Update restaurant list from search
  // updateRestaurant = (newRestaurant) => {
  //   this.setState({foundRestaurants: newRestaurant})
  // }

  // Click event allows user to click on item from filtered list and
  // a marker correlated to the item clicked will animate
  // restaurantItemClick = (item) => {
  //   this.state.markers.map(marker => {
  //     if(marker.title === item) {
  //       window.google.maps.event.trigger(marker, "click")
  //     }
  //   })
  // }

  render() {
    return (
      <main id="App">
        <header id="header" aria-label="Header" role="heading">
        <button className="hamButton">
          <i className="fa fa-bars"></i>
        </button>
        <h2>Thai Restaurants, Simi Valley</h2>
        </header>        
          <RestaurantSidebar aria-label="Search Bar" role="search"
            foundRestaurants={this.state.allRestaurants}
            markers={this.state.markers}
            search={this.state.search}
            updateSearch={this.props.updateSearch}
            restaurantItemClick={this.props.restaurantItemClick}
            
          />
          <Map />
      </main>
    );
  }
}

// Shows how to load Google Maps Library
// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
// Also credit to Elharony for breaking down the steps to creating the script
// to load Google Maps API
function mapScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = function() {
    alert("Google Maps Could Not Load. Try Again Later");
  }
}

export default App;