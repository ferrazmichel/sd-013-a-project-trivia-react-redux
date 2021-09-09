import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import FeedBackMessenger from '../components/FeedbackMessenger';
import FeedbackScore from '../components/FeedbackScore';

class Feedback extends Component {
  render() {
    return (
      <section>
        <header>
          <Header />
        </header>
        <FeedBackMessenger />
        <FeedbackScore />
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            onClick={ this.createRanking }
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

export default Feedback;
