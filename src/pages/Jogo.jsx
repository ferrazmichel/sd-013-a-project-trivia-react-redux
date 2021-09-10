import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      i: 0,
    };
    this.colorGreen = this.colorGreen.bind(this);
    this.colorRed = this.colorRed.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const buttonNext = document.querySelector('#button-next');
    const NUMBER_OF_QUESTIONS = 4;
    if (nextState.i === NUMBER_OF_QUESTIONS) {
      buttonNext.style.display = 'none';
    }
    return true;
  }

  colorGreen(e) {
    e.target.style.border = '3px solid rgb(6, 240, 15)';
    const wrong = document.querySelectorAll('.wrong');
    const NUM = 3;
    const styleWrong = '3px solid rgb(255, 0, 0)';
    if (wrong.length === NUM) {
      wrong[0].style.border = styleWrong;
      wrong[1].style.border = styleWrong;
      wrong[2].style.border = styleWrong;
    }
    wrong[0].style.border = styleWrong;
  }

  colorRed(e) {
    e.target.style.border = '3px solid rgb(255, 0, 0)';
    const correct = document.querySelector('.correct');
    correct.style.border = '3px solid rgb(6, 240, 15)';
  }

  nextQuestion() {
    this.setState((state) => ({ i: state.i + 1 }));
  }

  render() {
    const { questions } = this.props;
    const { i } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-text">{questions[i].question}</h1>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <button
            className="correct"
            onClick={ this.colorGreen }
            type="button"
            data-testid="correct-answer"
          >
            {questions[i].correct_answer}
          </button>
          {questions[i].incorrect_answers.map((incorrect, index) => (
            <p key={ index }>
              <button
                className="wrong"
                onClick={ this.colorRed }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {incorrect}
              </button>
            </p>
          ))}
        </div>
        <Link to="/feedback">
          <button type="button">feedback</button>
        </Link>
        <button
          type="button"
          id="button-next"
          onClick={ this.nextQuestion }
        >
          Próximo
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
