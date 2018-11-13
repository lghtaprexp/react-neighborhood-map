import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import RestaurantList from './components/RestaurantList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRestaurants: [],
      markers: []
    }
  }

  componentDidMount() {
    this.getRestaurants()
  }

  loadMap = () => {
    mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB7XNQZZPAKzsm7CkomnZA5jHGB4sHfeB4&callback=initMap")
    window.initMap = this.initMap
  }

  /* Use Axios to get restaurant data from FourSquare*/
  getRestaurants = () => {
    const fourSquareUrl = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "GGXCA2DKZ0EK0ID4S4SYLYTMPWFCNHOFBSBHFMOZTSJTAWX5",
      client_secret: "CKLZUO02MB5DKBQ4UCHV4Q0MT4UOV5EXPL0SPHDSE14IID4R",
      v: "20181109",
      query: "thai",
      near: "Simi Valley"
    }

    axios.get(fourSquareUrl + new URLSearchParams(params))
    .then(results => {
      // console.log(results)
      this.setState({allRestaurants: results.data.response.groups[0].items}, this.loadMap())
      // console.log(this.state.allRestaurants)
    })
    .catch(error => {
      console.log(error)
    })
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.269447, lng: -118.781479},
      zoom: 13
    });
    
    // Create InfoWindow

    let infowindow = new window.google.maps.InfoWindow();

    this.state.allRestaurants.map(restaurant => {
      // Create marker
      let marker = new window.google.maps.Marker({
        position: {lat: restaurant.venue.location.lat, lng: restaurant.venue.location.lng},
        map: map,
        title: restaurant.venue.name,
        animation: window.google.maps.Animation.DROP
      })

      // Add marker to an array of markers
      this.state.markers.push(marker)
      console.log(this.state.markers)

    // Old infowindow will close when new marker is clicked
     let contentString = `<h3>${restaurant.venue.name}</h3>
                          <p>${restaurant.venue.location.address}<br />
                          ${restaurant.venue.location.city}, ${restaurant.venue.location.postalCode}</p>`

    // Event listener to click on marker and open infowindow
    marker.addListener('click', function() {
      infowindow.setContent(contentString)

      // InfoWindow will open
      infowindow.open(map, marker);

      // Add animation to Markers
      //https://developers.google.com/maps/documentation/javascript/examples/marker-animations
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }      
      });
    })
  }

  render() {
    return (
      <main>
        <header>
          <span className="menu fas fa-bars"></span>
          <h1>Thai Food - Simi Valley, CA</h1>
        </header>
        <RestaurantList />
        <div id="map"></div>
      </main>
    );
  }
}

// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//     async defer></script>
function mapScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
