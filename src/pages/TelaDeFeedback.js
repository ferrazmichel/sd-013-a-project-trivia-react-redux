import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class TelaDeFeedback extends Component {
  constructor() {
    super();

    this.goToHome = this.goToHome.bind(this);
    this.goToRanking = this.goToRanking.bind(this);
  }

  goToRanking() {
    const { history } = this.props;
    history.push('/tela-de-ranking');
  }

  goToHome() {
    const { history } = this.props;
    history.push('/');
  }

  feedbackMessage() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const IT_COULD_BE_BETTER = 3;
    if (assertions < IT_COULD_BE_BETTER) return 'Podia ser melhor...';
    if (assertions >= IT_COULD_BE_BETTER) return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header score={ score } />
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.goToHome }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ver Ranking
        </button>
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
      </div>
    );
  }
}

TelaDeFeedback.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default TelaDeFeedback;
