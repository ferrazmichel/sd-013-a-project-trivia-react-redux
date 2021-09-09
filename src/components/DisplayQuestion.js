import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { handleScore } from '../redux/actions';

const ONE_SECOND = 1000;
const THIRTY = 30;
const TEN = 10;
const dificulties = {
  a: 1,
  b: 2,
  c: 3,
};
function mapDifficulty(string) {
  switch (string) {
  case 'hard':
    return dificulties.c;
  case 'medium':
    return dificulties.b;
  case 'easy':
    return dificulties.a;
  default:
    return null;
  }
}

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
    this.calculateScore = this.calculateScore.bind(this);
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

  saveScore() {
    const { gravatarEmail, name, assertions, score } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    }));
  }

  calculateScore(idTarget) {
    console.log('calculate');
    const { questions } = this.props;
    const { id, finalTime } = this.state;
    const question = questions[id];
    const { difficulty } = question;
    if (idTarget === 'correct-answer') {
      this.setState({
        score: TEN + (finalTime * mapDifficulty(difficulty)),
      }, async () => {
        const { updateScore } = this.props;
        const { score } = this.state;
        await updateScore(score);
        this.saveScore();
      });
    }
  }

  handleAnswer() {
    this.setState((prevState) => ({
      classCorrect: 'correct-answer',
      classWrong: 'wrong-answer',
      isAnswered: true,
      finalTime: prevState.finalTime - 1,
    }));
  }

  auxScore({ target }) {
    const { id } = target;
    this.calculateScore(id);
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
                  onClick={ (event) => {
                    this.handleAnswer();
                    this.auxScore(event);
                  } }
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
                onClick={ (event) => {
                  this.handleAnswer();
                  this.auxScore(event);
                } }
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
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.email,
  name: state.user.name,
  assertions: state.user.assertions,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(handleScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayQuestion);
