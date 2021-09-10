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
      history.push('/');
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
            {assertions >= WELL_PLAYED ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{assertions}</span>
            {questionX}
            de 5;
          </p>
          <p>
            Você marcou
            <span data-testid="feedback-total-score">
              {score}
            </span>
            pontos no total!
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
  }),
}.isRequired;

export default Feedbacks;
