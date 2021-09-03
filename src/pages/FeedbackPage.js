import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedbackPage extends Component {
  render() {
    const { feedback, finalScore, rightAnswers } = this.props;
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
            {`final score: ${finalScore}`}
          </span>
        </div>
      </div>
    );
  }
}

FeedbackPage.propTypes = {
  feedback: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  feedback: state.questions.results,
  finalScore: state.questions.score,
  rightAnswers: state.questions.results,
});

export default connect(mapStateToProps)(FeedbackPage);
