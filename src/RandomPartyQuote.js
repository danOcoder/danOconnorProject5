import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faRepublican } from '@fortawesome/free-solid-svg-icons';

library.add(faDemocrat, faRepublican);

const democrats = [
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

const republicans = [
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

class RandomPartyQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: '',
      date: '',
      tag: '',
      resArray: []
    };
  }

  partyClick = party => {
    const partyQuoteTag = `${party[this.props.randomNumber(party)]}`;
    console.log(partyQuoteTag);
    this.getPartyQuote(partyQuoteTag);
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
        let randomQuoteIndex = this.props.randomNumber(quoteArray);
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

  render() {
    return (
      <div className='wrapper'>
        <h2>
          Click a party button to receive a random POTUS quote about one of its
          members
        </h2>
        <div className='partyButtons'>
          <ul>
            <li>
              <a
                href='#0'
                onClick={() => {
                  this.partyClick(republicans);
                }}
              >
                <FontAwesomeIcon icon='republican' />
              </a>
            </li>
            <li>
              <a
                href='#0'
                onClick={() => {
                  this.partyClick(democrats);
                }}
              >
                <FontAwesomeIcon icon='democrat' />
              </a>
            </li>
          </ul>
        </div>
        <div className='fact'>
          <ul>
            <li>
              <p>{this.state.tag}</p>
            </li>
            <li>
              <p>{this.state.fact}</p>
            </li>
            <li>
              <p>{this.state.date}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RandomPartyQuote;
