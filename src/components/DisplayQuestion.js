import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonNext from './ButtonNext';
import ButtonsQuestions from './ButtonsQuestions';
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
      btnNext: 'btn-next-invisible',
    };

    this.timer = this.timer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
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
      btnNext: 'btn-next-visible',
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

  buttonNext() {
    const { id } = this.state;
    const { history } = this.props;
    const FOUR = 4;

    if (id < FOUR) {
      this.setState((previousState) => ({
        id: previousState.id + 1,
        classCorrect: '',
        classWrong: '',
        isAnswered: false,
        finalTime: 30,
      }), () => {
        this.shuffleQuestions();
        this.timer(THIRTY);
      });
    } else {
      console.log('oi');
      history.push('/feedback');
    }
  }

  render() {
    const { questions } = this.props;
    const {
      id,
      readyQuestions,
      classCorrect,
      classWrong,
      isAnswered,
      finalTime,
      btnNext,
    } = this.state;
    const question = questions[id];

    return (
      <div>
        <p>{finalTime}</p>
        <h3 data-testid="question-category">{question.category}</h3>
        <h2 data-testid="question-text">{question.question}</h2>
        <ButtonsQuestions
          id={ id }
          readyQuestions={ readyQuestions }
          classCorrect={ classCorrect }
          classWrong={ classWrong }
          isAnswered={ isAnswered }
          questions={ questions }
          handleAnswer={ this.handleAnswer }
        />
        <ButtonNext classBtn={ btnNext } handleId={ this.buttonNext } />
      </div>
    );
  }
}

DisplayQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(DisplayQuestion);
