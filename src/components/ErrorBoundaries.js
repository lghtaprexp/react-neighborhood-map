// Catch errors in child component and display
// a message
// https://reactjs.org/docs/error-boundaries.html
import React, { Component } from 'react';
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  componentDidCatch(error) {
  	this.setState({hasError: true})
  }

class ErrorBoundaries extends Component {

  render() {
  	if(this.state.hasError) {
  	  return <h1>Unable to load Google Maps. Try again later.</h1>
    }
    return this.props.children;
  }
}

export default ErrorBoundaries;