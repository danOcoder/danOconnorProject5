import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fact: '',
      date: '',
      tag: '',
      keyWord: '',
      quoteNum: '',
      resArray: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.searchQuotes(this.state.keyWord, this.state.quoteNum);

    this.setState({
      quoteNum: '',
      fact: '',
      resArray: []
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
          fact = `No results found for keyword ${
            this.state.keyWord
          } please try again`;
          this.setState({
            fact: fact
          });
        } else {
          this.setState({
            resArray: resArray
          });
        }
      })
      .catch(function(error) {
        alert(
          'Looks like all the negative press covfefe is gumming things up,please try again'
        );
        console.log(error);
      });
  };

  ReturnFacts = () => {
    if (this.state.resArray.length > 0) {
      return (
        <ul>
          {this.state.resArray.map(i => {
            return (
              <li key={i.quote_id}>
                <ul>
                  <li>
                    <p>Regarding {i.tags[0]}:</p>
                  </li>
                  <li>
                    <p>"{i.value}"</p>
                  </li>
                  <li>
                    <p>Appeared on: {i.appeared_at.slice(0, 10)}</p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <p>{this.state.fact}</p>;
    }
  };

  render() {
    return (
      <div className='wrapper'>
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
              <input type='submit' name='submit' id='submit' value='Submit' />
            </label>
          </fieldset>
        </form>
        <div className='fact'>{this.ReturnFacts()}</div>
      </div>
    );
  }
}

export default Search;
