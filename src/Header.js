import React, { Component } from 'react';
import './App.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import headerImg from './assets/header.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronCircleDown);

class Header extends Component {
  render() {
    return (
      <header>
        <div className='imgContainer'>
          <img src={headerImg} alt='Decorative banner' />
        </div>
        <div className='wrapper'>
          <h1>Potus Quotes</h1>
          <div className='linkWrap'>
            <Link to='main' spy={true} smooth={true} duration={1000}>
              <FontAwesomeIcon icon='chevron-circle-down' />
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
