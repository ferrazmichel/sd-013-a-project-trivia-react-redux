import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../redux/actions';

class GameCounter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };

    this.handleCounterChange = this.handleCounterChange.bind(this);
    this.dispatchIncorrectAnswer = this.dispatchIncorrectAnswer.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    console.log('Mountou');
    this.handleState();
  }

  handleState() {
    const { counter } = this.props;
    this.setState({
      counter: 30,
    });
  }

  scoreCalculator() {
    const { counter } = this.state;
    const { updateScore } = this.props;
    if (counter === 0) {
      return updateScore(0);
    }
  }

  dispatchIncorrectAnswer(timeout) {
    const { props: { handleTimeout } } = this;

    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const correctAnswer = document.querySelector('[data-testid="correct-answer"]');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    correctAnswer.disabled = true;

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
      wrongAnswer.disabled = true;
    });

    window.clearTimeout(timeout);
    this.scoreCalculator();
    handleTimeout();
  }

  async handleTimer() {
    const second = 1000;
    const { counter } = this.state;
    const timeout = setTimeout(() => {
      this.setState({
        counter: counter - 1,
      });
    }, second);
    return timeout;
  }

  async handleCounterChange() {
    const { counter } = this.state;
    this.handleTimer();

    if (counter <= 0) {
      window.clearTimeout(this.handleTimer());
      this.dispatchIncorrectAnswer(this.handleTimer());
    }
  }

  handleButtonClick() {
    const { nextQ } = this.props;
    nextQ();
    this.setState({
      counter: 30,
    });
    window.clearTimeout(this.handleTimer());
  }

  render() {
    const { counter } = this.state;
    const { disabled, renderIndex } = this.props;
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.handleButtonClick() }
      >
        Próxima
      </button>);
    const feedbackButton = (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </Link>);
    const howManyQuestions = 5;
    const finalButton = renderIndex === howManyQuestions - 1 ? feedbackButton
      : nextButton;
    const renderNextButton = disabled ? finalButton : null;
    this.handleCounterChange();
    return (
      <div>
        <p id="counter">
          {counter}
        </p>
        { renderNextButton }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch({ type: 'UPDATE_SCORE', score }),
  handleTimeout: () => dispatch({ type: 'INCORRECT_ANSWER' }),
  nextQ: () => dispatch(nextQuestion()),
});

const mapStateToProps = ({ userReducer, loginReducer, scoreReducer }) => ({
  loading: userReducer.loading,
  questions: userReducer.questions,
  disabled: userReducer.disabled,
  renderIndex: userReducer.renderIndex,
  userEmail: loginReducer.email,
  userName: loginReducer.name,
  score: scoreReducer.score,
});

GameCounter.propTypes = {
  handleTimeout: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameCounter);
