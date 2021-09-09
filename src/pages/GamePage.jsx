import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonClass: 'alternativas',
      showNextButton: false,
      numeroDaPergunta: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  handleClick() {
    const buttons = document.querySelectorAll('.alternativas');
    buttons.forEach((button) => {
      button.className = 'alternativas selectedErrada';
      if (button.getAttribute('data-testid') === 'correct-answer') {
        button.className = 'alternativas selectedCerta';
      }
    });
    this.setState({ showNextButton: true });
  }

  handleNext() {
    const { numeroDaPergunta } = this.state;
    const perguntaAtual = numeroDaPergunta + 1;

    const buttons = document.querySelectorAll('.alternativas');

    this.setState({ numeroDaPergunta: perguntaAtual });
    buttons.forEach((button) => {
      button.className = 'alternativas';
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
    const pergunta = results.filter((result, index) => (index === numeroDaPergunta));

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
    const { showNextButton } = this.state;
    return (
      <div>
        <Header />
        { this.renderButtons() }
        {
          showNextButton
            ? this.renderNextButton()
            : console.log('')
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.questionReducer.results,
});

GamePage.propTypes = {
  results: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, null)(GamePage);
