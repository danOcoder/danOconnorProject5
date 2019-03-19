import React, { Component } from 'react';
import Header from './Header.js';
import RandomFact from './RandomFact.js';
import RandomPartyQuote from './RandomPartyQuote.js';
import Search from './Search.js';
import footerImg from './assets/footer.png';
import './App.css';

class App extends Component {
  randomNumber = array => {
    return Math.floor(Math.random() * array.length);
  };

  render() {
    return (
      <div className='.SiteWrapper'>
        <Header />
        <main>
          <RandomFact />
          <RandomPartyQuote randomNumber={this.randomNumber} />
        </main>
        <Search />
        <footer>
          <div className='imgContainer'>
            <img src={footerImg} alt='Decorative banner' />
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
