import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import losingSound from '../sound_fx/losing-sound.mp3';
import winningSound from '../sound_fx/winning-sound.mp3';
import losingGif from '../images/tombo.gif';
import winningGif from '../images/comemoracao.gif';
import '../styles/telaDeFeedBack.css';

class TelaDeFeedback extends Component {
  constructor() {
    super();

    this.state = {
      win: false,
    };

    this.goToHome = this.goToHome.bind(this);
    this.goToRanking = this.goToRanking.bind(this);

    this.winning = new Audio(winningSound);
    this.losing = new Audio(losingSound);
  }

  componentDidMount() {
    this.selectGif();
  }

  selectGif() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const IT_COULD_BE_BETTER = 3;
    if (assertions >= IT_COULD_BE_BETTER) this.setState({ win: true });
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
    if (assertions < IT_COULD_BE_BETTER) {
      this.losing.play();
      return 'Podia ser melhor...';
    }
    if (assertions >= IT_COULD_BE_BETTER) {
      this.winning.play();
      return 'Mandou bem!';
    }
  }

  render() {
    const { win } = this.state;
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <main className="feedback-content">
        <Header score={ score } />
        <section className="feedback-text">
          <img
            className="feedback-gif"
            src={ win ? winningGif : losingGif }
            alt="winning or losing "
          />
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
        </section>
        <section className="feedback-buttons">
          <button
            className="play-again-button"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.goToHome }
          >
            Jogar Novamente
          </button>
          <button
            className="ranking-button"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            Ver Ranking
          </button>
        </section>
      </main>
    );
  }
}

TelaDeFeedback.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default TelaDeFeedback;
