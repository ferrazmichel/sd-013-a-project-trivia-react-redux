import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import { BUTTON_NEXT, INLINE_BLOCK } from './JogoConstante';
import './Jogo.css';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      i: 0,
      timer: 30,
      button: false,
    };
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.checkWrongAnswer = this.checkWrongAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.enableNextAndDisableOption = this.enableNextAndDisableOption.bind(this);
  }

  componentDidMount() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    buttonNext.style.display = 'none';
    const SECONDS = 1000;
    setInterval(this.setTimer, SECONDS);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    const NUMBER_OF_QUESTIONS = 4;

    if (nextState.i === NUMBER_OF_QUESTIONS) {
      buttonNext.parentNode.removeChild(buttonNext);
    }
    return true;
  }

  setTimer() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    const { timer, button } = this.state;
    if (timer - 1 <= 0) {
      const correct = document.querySelector('.correct');
      correct.classList.add('certo');
      buttonNext.style.display = INLINE_BLOCK;
      this.setState({
        button: true,
      });
      clearInterval(this.interval);
    }
    if (!button) {
      this.setState({
        timer: timer - 1,
      });
    }
  }

  enableNextAndDisableOption() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    if (buttonNext) {
      buttonNext.style.display = INLINE_BLOCK;
    }
    this.setState({
      button: true,
    });
  }

  checkCorrectAnswer(e) {
    this.enableNextAndDisableOption();
    e.target.classList.add('certo');
    const wrong = document.querySelectorAll('.wrong');
    const NUM = 3;

    if (wrong.length === NUM) {
      wrong[0].classList.add('errado');
      wrong[1].classList.add('errado');
      wrong[2].classList.add('errado');
    }
    wrong[0].classList.add('errado');
  }

  checkWrongAnswer(e) {
    this.enableNextAndDisableOption();
    e.target.classList.add('errado');
    const correct = document.querySelector('.correct');
    correct.classList.add('certo');
  }

  nextQuestion() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    buttonNext.style.display = 'none';
    const correctButton = document.querySelector('.certo');
    const wrong = document.querySelectorAll('.errado');
    correctButton.classList.remove('certo');
    const NUM = 3;
    const ONE = 1;
    if (wrong.length === NUM) {
      wrong[0].classList.remove('errado');
      wrong[1].classList.remove('errado');
      wrong[2].classList.remove('errado');
    } else if (wrong.length === ONE) {
      wrong[0].classList.remove('errado');
    }
    this.setState((state) => ({
      i: state.i + 1,
      timer: 30,
      button: false,
    }));
  }

  render() {
    const { questions } = this.props;
    const { i, timer, button } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-text">{questions[i].question}</h1>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <button
            disabled={ button }
            className="correct"
            onClick={ this.checkCorrectAnswer }
            type="button"
            data-testid="correct-answer"
          >
            {questions[i].correct_answer}
          </button>
          {questions[i].incorrect_answers.map((incorrect, index) => (
            <p key={ index }>
              <button
                disabled={ button }
                className="wrong"
                onClick={ this.checkWrongAnswer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {incorrect}
              </button>
            </p>
          ))}
        </div>
        <p>
          { timer }
        </p>
        <Link to="/feedback">
          <button type="button">feedback</button>
        </Link>
        <button
          data-testid="btn-next"
          type="button"
          id="button-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
});

Jogo.propTypes = {
  questions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Jogo);
