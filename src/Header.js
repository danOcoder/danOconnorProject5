import React, { Component } from 'react';
import headerImg from './assets/header.png';
import './App.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className='imgContainer'>
          <img src={headerImg} alt='Decorative banner' />
        </div>
        <div className='wrapper'>
          <h1>Potus Quotes</h1>
        </div>
      </header>
    );
  }
}

export default Header;
