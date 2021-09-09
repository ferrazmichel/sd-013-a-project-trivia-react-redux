import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackMessage(assertions) {
    const MINIMUM = 3;
    if (assertions < MINIMUM) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions } = player;
    const { scoreState, assertionsState } = this.props;
    const message = this.feedbackMessage(assertions);

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{message}</h2>
        <Link to="/ranking" data-testid="btn-ranking">
          Ver Ranking
        </Link>
        <div>
          <span>Número de acertos: </span>
          <span data-testid="feedback-total-question">{ assertionsState }</span>
        </div>
        <div>
          <span>Número de pontos: </span>
          <span data-testid="feedback-total-score">{scoreState}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreState: state.user.score,
  assertionsState: state.user.assertions,
});

Feedback.propTypes = {
  scoreState: PropTypes.number.isRequired,
  assertionsState: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
