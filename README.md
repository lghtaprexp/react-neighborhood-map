## Project Overview
A single page app created by using React, Google Maps, and FourSquare API to display the Thai restaurants in Simi Valley and its neighboring cities. Google Maps API was used to display the map, and the FourSquare API was used to get the restaurant data.

## Features
The markers represent the restaurants on the map. Clicking on a marker will display a window with additional info on the restaurant. A list of restaurants can be found on the left side of the screen. Typing in the search box can filter the restaurant name. Clicking on a restaurant from the list will animate the marker on the map and open a window to show more info.

## How To Run
* **Required** A Google Maps API key, and a FourSquare API key are required to run this app
* To get the Google Maps API key, use this [link](https://cloud.google.com/maps-platform/) and create an account
* And FourSquare API keys, use this [link](https://developer.foursquare.com/places-api) to create an account
* Clone or download the project to your local drive using this [link](https://github.com/lghtaprexp/react-neighborhood-map-proj)
* Open your code editor and navigate to the App.js file located in the `src` folder to replace the api keys received from Google Maps API, and FourSquare API in order to run the app
* Replace the Google Maps API key on line 32 with your key in App.js
```
"https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE&callback=initMap"
```
* Replace the FourSquare API keys with your FourSquare ID, Secret, and Version keys on line 8-10 in App.js
```
const FS_ID = "REPLACE TEXT WITH YOUR PERSONAL FOURSQUARE CLIENT ID";
const FS_SECRET = "REPLACE TEXT WITH YOUR PERSONAL FOURSQUARE CLIENT SECRET";
const FS_VERSION = "REPLACE TEXT WITH YOUR PERSONAL FOURSQUARE VERSION";
```
* Navigate to where the app is located and open the terminal
* Install dependencies by running `npm install`
* Launch app by running `npm start`
* Default browser should launch app running in local server [http://localhost:3000](http://localhost:3000)
* **Note** The default service worker used in this app only works in production build.
* Run `npm run build` in terminal to run app in production build. 

## Dependencies
* [Axios](https://www.npmjs.com/package/axios)
* [FourSquare](https://developer.foursquare.com/places-api)
* [Google Maps API](https://cloud.google.com/maps-platform/)

 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).