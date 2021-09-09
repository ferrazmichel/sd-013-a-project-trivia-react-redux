import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedbacks extends Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      score: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.getAssertionsAndScore = this.getAssertionsAndScore.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    this.getAssertionsAndScore(assertions, score);
    player.assertions = 0;
    player.score = 0; // zera e salva no localStorage chave player.score
    localStorage.setItem('state', JSON.stringify({ Player: { ...player } }));
  }

  getAssertionsAndScore(assertions, score) {
    this.setState({
      assertions,
      score,
    });
  }

  handleClick({ target: { textContent } }) {
    const { history } = this.props;

    if (textContent === 'Ver Ranking') {
      history.push('/ranking');
    }

    if (textContent === 'Jogar Novamente') {
      history.push('/gamepage');
    }
  }

  render() {
    const { assertions, score } = this.state; // Vem do estado do componente, e antes, do localStorage
    const WELL_PLAYED = 3;
    const questionX = (assertions === 1 ? 'questão' : 'questões');

    return (
      <div>
        <Header />
        <section>
          <p data-testid="feedback-text">
            {assertions >= WELL_PLAYED ? 'Mandou bem!' : 'Poderia ser melhor...'}
          </p>
          <p data-testid="feedback-total-question">
            {`Você acertou ${assertions} ${questionX} de 5`}
          </p>
          <p data-testid="feedback-total-score">
            {`Você marcou ${score} pontos no total!`}
          </p>
          <div className="button-container">
            <Button
              dataTestId="btn-play-again"
              name="Jogar Novamente"
              onClick={ this.handleClick }
            />
            <Button
              dataTestId="btn-ranking"
              name="Ver Ranking"
              onClick={ this.handleClick }
            />
          </div>
        </section>
      </div>
    );
  }
}

Feedbacks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedbacks;
