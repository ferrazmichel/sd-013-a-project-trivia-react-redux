import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
