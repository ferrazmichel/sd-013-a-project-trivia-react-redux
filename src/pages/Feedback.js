import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import '../styles/Feedback.css';

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
        <div className="container-feedback">
          <div className="card-feedback">
            <h2 data-testid="feedback-text" className="message-feedback">{ message }</h2>
            <div>
              <span className="span-message">Número de acertos: </span>
              <span
                data-testid="feedback-total-question"
                className="span-message"
              >
                { assertionsState }
              </span>
            </div>
            <div>
              <span className="span-message">Número de pontos: </span>
              <span
                data-testid="feedback-total-score"
                className="span-message"
              >
                {scoreState}
              </span>
            </div>
            <Link to="/ranking" data-testid="btn-ranking">
              <span className="btn-ranking">
                Ver Ranking
              </span>
            </Link>
            <Link to="/">
              <button
                className="btn-play"
                type="submit"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
          </div>
        </div>
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
