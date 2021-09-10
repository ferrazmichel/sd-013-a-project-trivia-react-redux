import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components';

export class Feedback extends Component {
  constructor(props) {
    super(props);

    this.feedbackMsg = this.feedbackMsg.bind(this);
    this.saveRanking = this.saveRanking.bind(this);
  }

  componentDidMount() {
    this.saveRanking();
  }

  feedbackMsg() {
    const { assertions } = this.props;
    const MIN_ASSERT = 3;
    return assertions >= MIN_ASSERT
      ? 'Mandou bem!'
      : 'Podia ser melhor...';
  }

  saveRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail } } = state;
    const newPlayer = {
      name, score, gravatarEmail,
    };
    if (!localStorage.getItem('rankings')) {
      localStorage.setItem('rankings', JSON.stringify([newPlayer]));
    } else {
      const rankings = JSON.parse(localStorage.getItem('rankings'));
      rankings.push(newPlayer);
      const orderedRanking = rankings.sort((a, b) => b.score - a.score);
      localStorage.setItem('rankings', JSON.stringify(orderedRanking));
    }
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMsg()}</p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
          {' '}
          pontos
        </p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          {' '}
          questões
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

export default connect(mapStateToProps)(Feedback);
