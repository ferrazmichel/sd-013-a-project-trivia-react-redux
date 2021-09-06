import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedbackPage extends Component {
  constructor(props) {
    super(props);
    this.assertionsLocalStorage = this.assertionsLocalStorage.bind(this);
    this.scorelocalStorage = this.scorelocalStorage.bind(this);
  }

  scorelocalStorage() {
    const score = JSON.parse(localStorage.getItem('state'));
    return score.player.score;
  }

  assertionsLocalStorage() {
    const assertions = JSON.parse(localStorage.getItem('state'));
    return assertions.player.assertions;
  }

  render() {
    const number = 3;
    return (
      <div>
        <Header />
        {this.assertionsLocalStorage() < number ? (
          <p data-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          <p data-testid="feedback-text">Mandou bem!</p>
        )}
        <div>
          <span data-testid="feedback-total-question">
            {`Right answers: ${this.assertionsLocalStorage()}`}
          </span>
        </div>
        <div>
          <span data-testid="feedback-total-score">
            {`Final score: ${this.scorelocalStorage()}`}
          </span>
        </div>
        <Link data-testid="btn-play-again" to="/">
          Play Again
        </Link>
        <Link data-testid="btn-ranking" to="/rankingpage">
          Raking
        </Link>
      </div>
    );
  }
}

FeedbackPage.propTypes = {
  feedback: PropTypes.func,
}.isRequired;

export default connect()(FeedbackPage);
