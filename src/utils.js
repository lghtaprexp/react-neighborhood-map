// Learned to create a utils file with a const object
// with functions from Stackoverflow
// https://stackoverflow.com/questions/38402025/how-to-create-helper-file-full-of-functions-in-react-native

const utils = {
  // Function to load Google Maps Library
  // https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
  // Also credit to Elharony for breaking down the steps to creating the script
  // to load Google Maps API
  mapScript: (url) => {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = function() {
    alert("Google Maps Could Not Load. Try Again Later.");
    }
  }
}

export default utils;