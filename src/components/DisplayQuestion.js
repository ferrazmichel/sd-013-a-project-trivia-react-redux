import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

const ONE_SECOND = 1000;
const THIRTY = 30;

class DisplayQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      classCorrect: '',
      classWrong: '',
      finalTime: 30,
      isAnswered: false,
      readyQuestions: [],
    };
    this.timer = this.timer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    this.shuffleQuestions();
    this.timer(THIRTY);
  }

  shuffleQuestions() {
    const { questions } = this.props;
    const { id } = this.state;
    const question = questions[id];
    const NUMBER = 0.5;
    let alternatives = [...question.incorrect_answers, question.correct_answer];
    alternatives = alternatives.sort(() => Math.random() - NUMBER);
    this.setState({ readyQuestions: alternatives });
  }

  handleAnswer() {
    this.setState((prevState) => ({
      classCorrect: 'correct-answer',
      classWrong: 'wrong-answer',
      isAnswered: true,
      finalTime: prevState.finalTime - 1,
    }));
  }

  timer(t) {
    const { isAnswered } = this.state;
    if (t === 0 || isAnswered) {
      this.handleAnswer();
      return null;
    }
    this.setState({ finalTime: t });
    setTimeout(() => this.timer(t - 1), ONE_SECOND);
  }

  render() {
    const { questions } = this.props;
    const {
      id,
      readyQuestions,
      classCorrect,
      classWrong,
      isAnswered,
      finalTime } = this.state;
    const question = questions[id];
    const INDEX_NUM = -1;
    let index = INDEX_NUM;
    return (
      <div>
        <p>{finalTime}</p>
        <h3 data-testid="question-category">{question.category}</h3>
        <h2 data-testid="question-text">{question.question}</h2>
        <div>
          {readyQuestions.map((alternative) => {
            if (alternative === question.correct_answer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct-answer"
                  onClick={ this.handleAnswer }
                  className={ classCorrect }
                  disabled={ isAnswered }
                >
                  {alternative}
                </button>);
            }
            index += 1;
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleAnswer }
                className={ classWrong }
                disabled={ isAnswered }
              >
                {alternative}
              </button>);
          })}
        </div>
      </div>
    );
  }
}

DisplayQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(DisplayQuestion);
