import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className='imgContainer'>
          <img src='/assets/header.png' alt='Decorative banner' />
        </div>
        <div className='wrapper'>
          <h1>Potus Quotes</h1>
        </div>
      </header>
    );
  }
}

export default Header;
