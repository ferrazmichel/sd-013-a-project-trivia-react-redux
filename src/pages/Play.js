import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchURL, loadFromLocalStaorage, saveToLocalStorage } from '../services';
import { sendPlayerInfo } from '../actions';
import Timer from '../components/Timer';

const CORRECT_ANSWER = 'correct-answer';
const MAX_QUESTIONS = 5;
const LAST_QUESTION_INDEX = MAX_QUESTIONS - 1;
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      questionIndex: 0,
      button: false,
      answerButton: false,
      answers: [],
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleStyle = this.handleButtonStyle.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.preventSortAnswers = this.preventSortAnswers.bind(this);
  }

  componentDidMount() {
    console.log('MONTOU');
    this.handleQuestions();
    const {
      name,
      gravatarEmail,
      player: { score, assertions },
      submitPlayer } = this.props;
    const TESTE = { name,
      gravatarEmail,
      score,
      assertions };
    submitPlayer({ player: TESTE });
    saveToLocalStorage('state', { player: TESTE });
  }

  componentDidUpdate(prevProps, prevState) {
    this.preventSortAnswers(prevState);
  }

  componentWillUnmount() {
    const {
      player: { name, gravatarEmail, score, assertions },
      submitPlayer,
    } = this.props;
    const TESTE = { name,
      gravatarEmail,
      score,
      assertions };
    submitPlayer({ player: TESTE });
    saveToLocalStorage('state', { player: TESTE });
  }

  // ao clicar na questão Às vezes reembaralha as questões, essa função resolve o bug
  preventSortAnswers(prevState) {
    const { questions, questionIndex, button } = this.state;
    // primeira pergunta
    if (!prevState.questions && questions) {
      this.setState({
        answers: this.handleAnswers(questions.results[questionIndex]),
      });
    }
    // quando trocar de pergunta atualiza as respostas
    if (prevState.questionIndex < questionIndex) {
      this.setState({
        answers: this.handleAnswers(questions.results[questionIndex]),
      });
    }
    // tempo acabou ou respondeu desativa os butões
    if (!prevState.button && button) {
      const disableButtons = document.querySelectorAll('.answer-style');
      disableButtons.forEach((btn) => {
        btn.disabled = button;
      });
    }
  }

  handleAnswers(results) {
    const answers = [...results.incorrect_answers, results.correct_answer];
    const HALF = 0.5;
    const { button } = this.state;
    answers.sort(() => Math.random() - HALF);
    // https://javascript.info/array-methods#shuffle-an-array
    return (answers.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        className="answer-style"
        name={ answer === results.correct_answer ? CORRECT_ANSWER
          : `wrong-answer-${index}` }
        data-testid={ answer === results.correct_answer ? CORRECT_ANSWER
          : `wrong-answer-${index}` }
        disabled={ button }
        onClick={ this.handleClick }
      >
        {answer}
      </button>))
    );
  }

  handleButtonStyle() {
    const whichButton = document.querySelectorAll('.answer-style');
    whichButton.forEach((button) => {
      if (button.name === CORRECT_ANSWER) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
  }

  async handleQuestions() {
    const token = loadFromLocalStaorage('token');
    const questionURL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&token=${token}`;
    const requestQuestions = await fetchURL(questionURL);
    this.setState({ questions: requestQuestions });
  }

  redirectTo(path) {
    const { history } = this.props;
    history.push(path);
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    if (questionIndex === LAST_QUESTION_INDEX) {
      this.redirectTo('/feedback');
    } else {
      this.setState({ questionIndex: questionIndex + 1 });
    }
  }

  handleButton() {
    this.setState((prevState) => ({
      button: !prevState.button,
    }));
  }

  handleClick(e) {
    this.handleButtonStyle();
    this.setState({ answerButton: true });
    if (e.target.name === CORRECT_ANSWER) {
      const {
        player: { name, gravatarEmail, score, assertions },
        submitPlayer,
      } = this.props;
      const TESTE = { name,
        gravatarEmail,
        score: score + 1,
        assertions: assertions + 1 };
      submitPlayer({ player: TESTE });
      saveToLocalStorage('state', { player: TESTE });
    }
  }

  render() {
    const { questions, questionIndex, answerButton, answers } = this.state;
    if (!questions) {
      return (
        <div className="play-main">
          <Header />
          <div>Loading...</div>
        </div>);
    }
    const { results } = questions;
    return (
      <div className="play-main">
        <Header />
        <div className="body-div">
          <div className="play-question">
            <section className="play-question-board">
              <h2 data-testid="question-category">
                { results[questionIndex].category }
              </h2>
              <p data-testid="question-text">
                { results[questionIndex].question }
              </p>
            </section>
            <div className="play-question-answers">
              <div className="playquestion-answers-options">
                {/* { this.handleAnswers(results[questionIndex]) } */}
                { answers }
              </div>
              <Timer
                nextQuestion={ this.nextQuestion }
                handleButton={ this.handleButton }
                answerButton={ answerButton }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { name, gravatarEmail }, play: { player } }) => ({
  player,
  name,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});

Play.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitPlayer: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.shape({
    trim: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Play);
