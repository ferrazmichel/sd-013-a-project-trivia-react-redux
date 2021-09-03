import React, { Component } from 'react';
import Header from '../components/Header';
import { loadFromLocalStaorage } from '../services';

class Play extends Component {
  componentDidMount() {
    const token = loadFromLocalStaorage('token');
    console.log('MONTOU', token);
  }

  render() {
    return (
      <div>
        <h1>Play</h1>
        <Header />
      </div>
    );
  }
}

export default Play;
