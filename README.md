## Project Overview
A single page app created by using React, Google Maps, and FourSquare API to display the Thai restaurants in Simi Valley and its neighboring cities. Google Maps API was used to display the map, and the FourSquare API was used to get the restaurant data.

## Features
The markers represent the restaurants on the map. Clicking on a marker will display a window with additional info on the restaurant. A list of restaurants can be found on the left side of the screen. Typing in the search box can filter the restaurant name. Clicking on a restaurant from the list will animate the marker on the map and open a window to show more info.

## How To Run
* **Required** A Google Maps API key, and a FourSquare API key are required to run this app
* Clone or download the project to your local drive
* Open your code editor and navigate to the App.js file located in the `src` folder to replace the api keys received from Google Maps API, and FourSquare API in order to run the app
* Replace the Google Maps API key on line 30 with your key in App.js
* Replace the FourSquare API keys with your FourSquare ID, Secret, and Version keys on line 8-10 in App.js
* Navigate to where the app is located and open the terminal
* Install dependencies by running `npm install`
* Launch app by running `npm start`
* Default browser should launch app running in local server [http://localhost:3000](http://localhost:3000)
* **Note** The default service worker used in this app only works in production build.
* Run `npm run build` in terminal to run app in production build. 

 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).