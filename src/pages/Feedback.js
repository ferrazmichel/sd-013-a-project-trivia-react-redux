import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.saveRanking();
  }

  feedbackMessage(assertions) {
    const MINIMUM = 3;
    if (assertions < MINIMUM) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  saveRanking() {
    const { email, name, scoreState } = this.props;
    const picture = `https://www.gravatar.com/avatar/${MD5(email)}`;
    const storage = localStorage.getItem('ranking');
    const playerRanking = { name, score: scoreState, picture };
    if (storage) {
      let arrayRanking = JSON.parse(storage);
      arrayRanking = [...arrayRanking, playerRanking];
      localStorage.setItem('ranking', JSON.stringify(arrayRanking));
    } else {
      const ranking = [playerRanking];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
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
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreState: state.user.score,
  assertionsState: state.user.assertions,
  email: state.user.email,
  name: state.user.name,
});

Feedback.propTypes = {
  scoreState: PropTypes.number.isRequired,
  assertionsState: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
