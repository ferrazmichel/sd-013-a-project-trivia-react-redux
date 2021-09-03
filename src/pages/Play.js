import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Play extends Component {
  render() {
    return (
      <div>
        <h1>Play</h1>
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
