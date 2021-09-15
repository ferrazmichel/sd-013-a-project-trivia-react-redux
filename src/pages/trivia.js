import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { stateAnswered, fetchApiQuestions } from '../redux/actions';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      seconds: 30,
      difficulty: '',
      answered: false,
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.timerMount = this.timerMount.bind(this);
    this.linkOrNext = this.linkOrNext.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    const { dispatchAnswered } = this.props;
    const { answered } = this.state;
    dispatchAnswered(answered);
    this.getQuestions();
    this.timerMount();
  }

  async getQuestions() {
    const { trivia: { token }, apiQuestions } = this.props;
    const questions = await apiQuestions(token);
    return questions;
  }

  timerMount() {
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      const timeToInitiate = 1000; // Tempo esperado para começar o cronômetro
      this.timer = setInterval(this.countDown, timeToInitiate);
    }
  }

  countDown() {
    const { dispatchAnswered,
      trivia: { answered } } = this.props;
    const { seconds } = this.state;
    if (!answered) {
      if (seconds === 0) {
        clearInterval(this.timer);
        dispatchAnswered(true);
      } else {
        this.setState({
          seconds: seconds - 1,
        });
      }
    }
  }

  next() {
    const maxId = 4;
    const { id, seconds } = this.state;
    const {
      dispatchAnswered } = this.props;
    if (id !== maxId) {
      this.setState({
        id: id + 1,
        seconds: 30,
      });
      dispatchAnswered(false);
      this.countDown();
      if (seconds === 0) {
        const timeToInitiate = 1000;
        this.timer = setInterval(this.countDown, timeToInitiate);
      }
    }
  }

  linkOrNext() {
    const { id } = this.state;
    const { history } = this.props;
    const maxId = 4;
    if (id === maxId) {
      history.push('/feedback');
    } else this.next();
  }

  changeState() {
    const { dispatchAnswered } = this.props;
    return dispatchAnswered(true);
  }

  async sumScore() {
    this.changeState();
    const { trivia: { questions } } = this.props;
    const { id, seconds } = this.state;
    await this.setState({
      difficulty: questions[id].difficulty,
    });
    const { difficulty } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    const ten = 10;
    const two = 2;
    const three = 3;
    switch (difficulty) {
    case 'easy':
      state.player.score += ten + (seconds);
      break;
    case 'medium':
      state.player.score += ten + (seconds * two);
      break;
    case 'hard':
      state.player.score += ten + (seconds * three);
      break;
    default: return;
    }
    state.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(state));
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.linkOrNext }
        data-testid="btn-next"
      >
        Pŕoxima
      </button>
    );
  }

  render() {
    const { trivia: { answered } } = this.props;
    const { seconds, id } = this.state;
    return (
      <div>
        <div>
          <Header />
          <Questions
            id={ id }
            sumScore={ this.sumScore }
            changeState={ this.changeState }
          />
          <div>{ seconds }</div>
        </div>
        {answered && this.renderButton()}
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  trivia: PropTypes.shape(PropTypes.obj).isRequired,
  dispatchAnswered: PropTypes.func.isRequired,
  apiQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAnswered: (payload) => dispatch(stateAnswered(payload)),
  apiQuestions: (token) => dispatch(fetchApiQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
