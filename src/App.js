import React, { Component } from 'react';
import Header from './Header.js';
import './App.css';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat } from '@fortawesome/free-solid-svg-icons';
import { faRepublican } from '@fortawesome/free-solid-svg-icons';

library.add(faDemocrat, faRepublican);

class App extends Component {
  constructor() {
    super();
    this.state = {
      fact:
        'My fingers are long and beautiful, as, it has been well been documented',
      date: 'Appeared on: 2015-08-07',
      tag: 'Regarding Donald Trump:',
      keyWord: '',
      quoteNum: '',
      resArray: []
    };

    this.democrats = [
      'Hillary%20Clinton',
      'President%20Obama',
      'Elizabeth%20Warren',
      'Bernie%20Sanders',
      'Bill%20Clinton',
      'Tim%20Kaine',
      "Martin%20O'Malley",
      'Michael%20Nutter',
      'Barack%20Obama',
      'Cory%20Booker',
      'Sam%20Liccardo',
      'Lincoln%20Chafee',
      'Bakari%20Sellers',
      'Neil%20Young',
      'Marty%20Walsh',
      'Ben%20Cardin',
      'Stephanie%20Rawlings-Blake',
      'Ruth%20Bader%20Ginsburg',
      'Joseph%20R.%20Biden%20Jr.',
      'Bill%20and%20Hillary%20Clinton',
      'Bette%20Midler'
    ];

    this.republicans = [
      'Ted%20Cruz',
      'Jeb%20Bush',
      'Marco%20Rubio',
      'John%20Kasich',
      'Lindsey%20Graham',
      'Ben%20Carson',
      'Carly%20Fiorina',
      'John%20McCain',
      'Rick%20Perry',
      'George%20Pataki',
      'Scott%20Walker',
      'Rand%20Paul',
      'Donald%20Trump',
      'George%20W.%20Bush',
      'Megyn%20Kelly',
      'Bobby%20Jindal',
      'Tom%20Ridge',
      'Chris%20Christie',
      'Arianna%20Huffington',
      'Mitt%20Romney',
      'Ivanka%20Trump'
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  randomNumber = array => {
    return Math.floor(Math.random() * array.length);
  };

  randomClick = () => {
    this.getRandomQuote();
  };

  partyClick = party => {
    const partyQuoteTag = `${party[this.randomNumber(party)]}`;
    this.getPartyQuote(partyQuoteTag);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.searchQuotes(this.state.keyWord, this.state.quoteNum);
  };

  getRandomQuote = () => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      params: {
        reqUrl: `https://api.tronalddump.io/random/quote`,
        proxyHeaders: {
          header_params: 'value'
        },
        xmlToJSON: false
      }
    })
      .then(res => {
        let resObj = res.data;
        let tag = `Regarding ${resObj.tags}:`;
        let fact = `"${resObj.value}"`;
        let date = `Appeared on: ${resObj.appeared_at.slice(0, 10)}`;
        this.setState({
          fact: fact,
          date: date,
          tag: tag,
          resArray: []
        });
      })
      .catch(function(error) {
        alert('Looks like the flux capacitor is on the fritz again', error);
      });
  };

  getPartyQuote = endPoint => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      params: {
        reqUrl: `https://api.tronalddump.io/tag/${endPoint}`,
        proxyHeaders: {
          header_params: 'value'
        },
        xmlToJSON: false
      }
    })
      .then(res => {
        let quoteArray = res.data._embedded.tags;
        let randomQuoteIndex = this.randomNumber(quoteArray);
        let fact = `"${quoteArray[randomQuoteIndex].value}"`;
        let date = `Appeared on: ${quoteArray[
          randomQuoteIndex
        ].appeared_at.slice(0, 10)}`;
        let tag = `Regarding ${quoteArray[randomQuoteIndex].tags[0]}:`;
        this.setState({
          fact: fact,
          date: date,
          tag: tag,
          resArray: []
        });
      })
      .catch(function(error) {
        alert('Looks like the flux capacitor is on the fritz again', error);
      });
  };

  searchQuotes = (query, size) => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      params: {
        reqUrl: `https://api.tronalddump.io/search/quote?query=${query}&size=${size}`,
        proxyHeaders: {
          header_params: 'value'
        },
        xmlToJSON: false
      }
    })
      .then(res => {
        const resArray = res.data._embedded.quotes;
        let fact = '';
        if (resArray === undefined) {
          fact = `No results found for key word ${this.state.keyWord}`;
        }
        console.log(resArray);
        this.setState({
          resArray: resArray
        });
      })
      .catch(function(error) {
        alert('Looks like the flux capacitor is on the fritz again', error);
      });
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <main>
          <div className='wrapper'>
            <h2>Click POTUS to a receive a random quote</h2>
            <button onClick={this.randomClick} href='#0'>
              <div className='imgContainer'>
                <img
                  src='/assets/potus.png'
                  alt='Cartoon illustration of Donald Trump'
                />
              </div>
            </button>
            {/* Fact should be a component */}
            <div className='fact'>
              <ul>
                <li>
                  <p>{this.state.tag}</p>
                  <p>{this.state.fact}</p>
                  <p>{this.state.date}</p>
                </li>
              </ul>
            </div>
            <h2>
              Click a party button to receive a random POTUS quote about one of
              its members
            </h2>
            <div className='partyButtons'>
              <ul>
                <li>
                  <a
                    href='#0'
                    onClick={() => {
                      this.partyClick(this.republicans);
                    }}
                  >
                    <FontAwesomeIcon icon='republican' />
                  </a>
                </li>
                <li>
                  <a
                    href='#0'
                    onClick={() => {
                      this.partyClick(this.democrats);
                    }}
                  >
                    <FontAwesomeIcon icon='democrat' />
                  </a>
                </li>
              </ul>
            </div>
            <h2>Search a keyword to return up to 25 POTUS quotes</h2>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label htmlFor='keyWord'>
                  Keyword:
                  <input
                    type='text'
                    name='keyWord'
                    id='keyWord'
                    minLength='3'
                    required
                    value={this.state.keyWord}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor='quoteNum'>
                  # of quotes:
                  <input
                    type='number'
                    name='quoteNum'
                    id='quoteNum'
                    min='1'
                    max='25'
                    required
                    value={this.state.quoteNum}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor='submit'>
                  <input
                    type='submit'
                    name='submit'
                    id='submit'
                    value='Submit'
                  />
                </label>
              </fieldset>
            </form>
            <div className='fact'>
              <ul>
                {this.state.resArray.map(i => {
                  return (
                    <li key={i.quote_id}>
                      <p>Regarding {i.tags[0]}:</p>
                      <p>"{i.value}"</p>
                      <p>Appeared on: {i.appeared_at.slice(0, 10)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
        <footer>
          <div className='imgContainer'>
            <img src='/assets/footer.png' alt='Decorative banner' />
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
