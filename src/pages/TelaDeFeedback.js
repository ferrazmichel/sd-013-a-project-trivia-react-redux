import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class TelaDeFeedback extends Component {
  constructor() {
    super();

    this.goToHome = this.goToHome.bind(this);
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
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.goToHome }
        >
          Jogar Novamente
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
