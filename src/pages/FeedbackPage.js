import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { assertionsLocalStorage, scorelocalStorage } from '../services/localstage';
import './pagesCSS/feedbackpage.css';

class FeedbackPage extends Component {
  render() {
    const number = 3;
    return (
      <>
        <Header />
        <div className="container-feedback-main">
          <div className="container-feedback-phrase">
            {assertionsLocalStorage() < number ? (
              <p data-testid="feedback-text">Podia ser melhor...</p>
            ) : (
              <p data-testid="feedback-text">Mandou bem!</p>
            )}
          </div>
          <div className="container-feedback-assertions">
            <span data-testid="feedback-total-question">
              {assertionsLocalStorage()}
            </span>
          </div>
          <div className="container-feedback-score">
            <span data-testid="feedback-total-score">
              {scorelocalStorage()}
            </span>
          </div>
          <div className="container-feedback-buttons">
            <Link data-testid="btn-play-again" to="/">
              Play Again
            </Link>
            <Link data-testid="btn-ranking" to="/rankingpage">
              Raking
            </Link>
          </div>
        </div>
      </>
    );
  }
}

FeedbackPage.propTypes = {
  feedback: PropTypes.func,
}.isRequired;

export default connect()(FeedbackPage);
