import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import RestaurantSidebar from './components/RestaurantSidebar';
import Map from './components/Map';
import Header from './components/Header';
import utils from './utils'

const FS_ID = "GGXCA2DKZ0EK0ID4S4SYLYTMPWFCNHOFBSBHFMOZTSJTAWX5";
const FS_SECRET = "CKLZUO02MB5DKBQ4UCHV4Q0MT4UOV5EXPL0SPHDSE14IID4R";
const FS_VERSION = "20181109";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRestaurants: [],
      foundRestaurants: [],
      markers: [],
      search: '',
      center: {lat: 34.269447, lng: -118.781479},
      showSidebar: false
    }
  }

  componentDidMount() {
    this.getRestaurants("thai", "Simi Valley");
  }

  // Load Google Maps script asynchronously
  loadMap = () => {
    utils.mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB7XNQZZPAKzsm7CkomnZA5jHGB4sHfeB4&callback=initMap")
    window.initMap = this.initMap;
  }

  // Setting up search parameters to use FourSquare API
  getRestaurants = (query, location) => {
    // Get FourSquare data
    const fourSquareUrl = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: FS_ID,
      client_secret: FS_SECRET,
      v: FS_VERSION,
      query: query,
      near: location,
      limit: 15
    }

    // Use Axios to get restaurant data from FourSquare
    // Thanks to Elharony for breaking down the steps to 
    // to use Axios to get data
    // youtu.be/dAhMIF0fNpo
    axios.get(fourSquareUrl + new URLSearchParams(params))
    .then(results => {
      // console.log(results);
      this.setState({allRestaurants: results.data.response.groups[0].items},
                    this.loadMap);
      // console.log(this.state.allRestaurants);
    })
    .catch(error => {
      alert("Error! Unable To Load FourSquare Data. Try Again Later.", error);
    });
  }

  // Initialize map to page
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.state.center.lat, lng: this.state.center.lng},
      scrollwheel: true,
      zoom: 11
    });
    
    // Create InfoWindow
    let infoWindow = new window.google.maps.InfoWindow();
    // Create markers array to store markers that we get from
    // mapping over the restaurant data we get from 
    // the FourSquare API
    let allMarkers = [];

    // Get markers for search results from the allRestaurants array
    this.state.allRestaurants.map((restaurant) => {
      // Create marker
      let marker = new window.google.maps.Marker({
        position: {lat: restaurant.venue.location.lat, lng: restaurant.venue.location.lng},
        map: map,
        name: restaurant.venue.name,
        id: restaurant.venue.id,
        title: 'Click For More Details.',
        // Animate markers when map loads
        animation: window.google.maps.Animation.DROP
      })

      // Add marker to allMarkers array      
      allMarkers.push(marker);
      // console.log(allMarkers)
      this.setState({markers: allMarkers, foundRestaurants: allMarkers});
      // Create content to display within InfoWindow
      let contentString = `<h3>${restaurant.venue.name}</h3>
                           <p>${restaurant.venue.location.address}<br />
                           ${restaurant.venue.location.city}, ${restaurant.venue.location.postalCode}</p>`

      // Function to open infoWindow
      let openInfoWindow = () => {
        // Set the content of InfoWindow with the restaurant's name,
        // and address
        infoWindow.setContent(contentString);
        // Open InfoWindow      
        infoWindow.open(map, marker);
      }

      // Add animation to markers functions
      // https://developers.google.com/maps/documentation/javascript/examples/marker-animations
      // Set bounce animation to three quarters of a second
      let animateMarker = () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        } setTimeout(() => {marker.setAnimation(null)}, 750);      
      }

      // Event listener allows user to click on marker and open
      // infoWindow. Old InfoWindow will close when a new marker
      // is clicked
      window.google.maps.event.addListener(marker, 'click', () => {        
        map.setCenter(marker.position);
        openInfoWindow();
        animateMarker();
      });
    });    
  }

  // Filter and search for restaurant within the sidebar
  updateSearch = (search) => {    
    if(search.length > 0) {
      this.state.markers.map((marker) => marker.setVisible(false));
      // To reduce error, all user input will be converted to lowercase
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
      let searchResults = this.state.markers.filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()));
      searchResults.map((marker) => marker.setVisible(true));
      this.setState({foundRestaurants: searchResults, search});
      
    } else {
      // Keep markers display for results from search
      this.setState({foundRestaurants: this.state.markers, search});
      // Set visibility of markers from search to visible
      this.state.foundRestaurants.map(marker => marker.setVisible(true));
      this.state.markers.map(marker => marker.setVisible(true));
    }
  }

  // Click event allows user to click on item from filtered list and
  // a marker correlated to the item clicked will animate
  restaurantItemClick = (name) => {
    this.state.markers.map((marker) => {
      if(marker.name === name) {
        window.google.maps.event.trigger(marker, "click")
      }
    })
  }

  // Toggle sidebar
  toggleSidebar = () => {
   // console.log("clicked");
   this.setState((prevState) => {
    return {showSidebar: !prevState.showSidebar};
   });
  }

  render() {
    let restaurantSidebar;
    if(this.state.showSidebar) {
      restaurantSidebar = 
        <RestaurantSidebar
          foundRestaurants={this.state.foundRestaurants}
          markers={this.state.markers}
          search={this.state.search}
          updateSearch={this.updateSearch}
          restaurantItemClick={this.restaurantItemClick}
          toggleSidebar={this.toggleSidebar}         
        />;
    }

    return (
      <main id="App">
        <Header />
        {restaurantSidebar}
        <Map />
      </main>
    );
  }
}

export default App;