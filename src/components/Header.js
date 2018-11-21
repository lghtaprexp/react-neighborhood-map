import React, { Component } from 'react';
import '../App.css';

class Header extends Component {

  render() {
  	return (
  	  <header id="header" aria-label="Header" role="heading">
        <button className="hamButton fa fa-bars" onClick={this.props.toggleSidebar}></button>
        <h1 className="restaurantTitle">Thai Food - Simi Valley</h1>
      </header>
    );
  }
}

export default Header;