import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonClass: 'alternativas',
      showNextButton: false,
      numeroDaPergunta: 0,
      stopCount: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  handleClick({ target }) {
    const buttons = document.querySelectorAll('.alternativas');
    buttons.forEach((button) => {
      button.className = 'alternativas selectedErrada';
      if (button.getAttribute('data-testid') === 'correct-answer') {
        button.className = 'alternativas selectedCerta';
      }
    });

    this.handleScore(target);
    this.setState({ stopCount: true });
    this.setState({ showNextButton: true });
  }

  handleScore(target) {
    const { numeroDaPergunta } = this.state;
    const { remainingTime, results } = this.props;
    const { difficulty } = results[numeroDaPergunta];
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;
    const scoreFormula = TEN + (remainingTime * difficultyPoints[difficulty]);
    const player = JSON.parse(localStorage.getItem('state'));

    if (target.getAttribute('data-testid') === 'correct-answer') {
      const assertion = player.player.assertions + 1;
      player.player.assertions = assertion;
      player.player.score += scoreFormula;
      localStorage.setItem('state', JSON.stringify(player));
    } else {
      player.player.score += 0;
    }
  }

  handleNext() {
    const { numeroDaPergunta } = this.state;
    const { history } = this.props;
    const FOUR = 3;
    if (numeroDaPergunta > FOUR) history.push('/feedback');
    const perguntaAtual = numeroDaPergunta + 1;
    const buttons = document.querySelectorAll('.alternativas');
    this.setState({ numeroDaPergunta: perguntaAtual });
    buttons.forEach((button) => {
      button.className = 'alternativas';
      button.disabled = false;
    });
    this.setState({ showNextButton: false });
  }

  renderNextButton() {
    return (
      <button
        data-testid="btn-next"
        className="button"
        type="submit"
        onClick={ this.handleNext }
      >
        Proxima
      </button>
    );
  }

  renderButtons() {
    const { numeroDaPergunta, buttonClass } = this.state;
    const { results } = this.props;
    const pergunta = results.filter((_result, index) => (index === numeroDaPergunta));

    return (
      <div>
        { pergunta.map((result, index) => (
          <div key={ index }>
            <div data-testid="question-category">{result.category}</div>
            <div data-testid="question-text">{result.question}</div>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="correct-answer"
            >
              {result.correct_answer}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-0"
            >
              {result.incorrect_answers[0]}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-1"
            >
              {result.incorrect_answers[1]}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-2"
            >
              {result.incorrect_answers[2]}
            </button>
          </div>
        )) }
      </div>
    );
  }

  render() {
    const { showNextButton, stopCount } = this.state;
    return (
      <div>
        <Header />
        { this.renderButtons() }
        {
          showNextButton
            ? this.renderNextButton()
            : console.log('')
        }
        <Timer stopCount={ stopCount } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.questionReducer.results,
  remainingTime: state.questionReducer.time,
});

GamePage.propTypes = {
  results: PropTypes.arrayOf.isRequired,
  remainingTime: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(GamePage);
