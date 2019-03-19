import React, { Component } from 'react';
import './App.css';
import potusImg from './assets/potus.png';
import axios from 'axios';

class RandomFact extends Component {
  constructor() {
    super();

    this.state = {
      fact: '',
      date: '',
      tag: '',
      resArray: []
    };
  }

  randomClick = () => {
    this.getRandomQuote();
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
          tag: tag
        });
      })
      .catch(function(error) {
        alert('Looks like the flux capacitor is on the fritz again', error);
      });
  };

  render() {
    return (
      <div className='wrapper'>
        <h2>Click POTUS to a receive a random quote</h2>
        <button onClick={this.randomClick} href='#0'>
          <div className='imgContainer'>
            <img src={potusImg} alt='Cartoon illustration of Donald Trump' />
          </div>
        </button>
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

export default RandomFact;
