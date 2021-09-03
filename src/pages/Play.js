import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Play extends Component {
  render() {
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-settings"
        >
          <Link to="/feedback">Feedback</Link>
        </button>
      </div>
    );
  }
}

export default Play;
