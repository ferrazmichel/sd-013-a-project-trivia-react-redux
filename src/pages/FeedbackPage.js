import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import PropTypes from 'prop-types';

class FeedbackPage extends Component {
    render() {
      const { feedback, score, rightAnswers } = this.props;
      const number = 3;
      return (
        <div>
          <Header />
          {(feedback < number) ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
          <div>
          <span data-testid="feedback-total-question">
            {`right answers: ${rightAnswers}`}
          </span>
        </div>
        <div>
          <span data-testid="feedback-total-score">
            {`final score: ${score}`}
          </span>
        </div>
        <Link data-testid="btn-play-again" to="/">Play Again</Link>
        <Link data-testid="btn-ranking" to="/rankingPage">Ranking</Link> {/* ainda nao existe a Ranking Page */}
        </div>
      );
    }
  }
  
  FeedbackPage.propTypes = {
    feedback: PropTypes.func,
  }.isRequired;
  
  const mapStateToProps = (state) => ({
    feedback: state.questions.results,
    score: state.questions.score,
    rightAnswers: state.questions.results,
  });
  
  export default connect(mapStateToProps)(FeedbackPage);