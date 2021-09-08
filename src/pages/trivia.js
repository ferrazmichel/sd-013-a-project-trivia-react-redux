import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Header';

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      id: 0,
      seconds: 30,
      difficulty: '',
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.changeState = this.changeState.bind(this);
    // this.isAnswered = this.isAnswered.bind(this);
    this.next = this.next.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.timerMount = this.timerMount.bind(this);
    this.linkOrNext = this.linkOrNext.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    this.timerMount();
  }


  timerMount() {
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      const timeToInitiate = 1000; // Tempo esperado para começar o cronômetro
      this.timer = setInterval(this.countDown, timeToInitiate);
    }
  }

  countDown() {
    const { answered, seconds } = this.state;
    if (!answered) {
      if (seconds === 0) {
        clearInterval(this.timer);
        this.setState({ answered: true });
      } else this.setState({ seconds: seconds - 1 });
    }
  }

  changeState() { this.setState({ answered: true }); }

  // isAnswered(className) {
  //   const { answered } = this.state;
  //   return answered ? className : '';
  // }

  // isCompleted() {
  //   const { answered } = this.state;
  //   return answered;
  // }

  next() {
    const maxId = 4;
    const { id, seconds } = this.state;
    if (id !== maxId) {
      this.setState({
        id: id + 1,
        answered: false,
        seconds: 30,
      });
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
    if (id === maxId) history.push('/feedback');
    else this.next();
  }

  async sumScore() {
    this.changeState();
    const { trivia: { questions } } = this.props;
    const { id, correct } = this.state;
    await this.setState({
      difficulty: questions[id].difficulty, correct: correct + 1,
    });
    const { seconds, difficulty } = this.state;
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
    const one = 1;
    state.player.assertions += one;
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
    const { trivia: { questions } } = this.props;
    const { seconds, id, answered } = this.state;
    if (questions.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <Header />
          <Questions id={ id } />
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
};

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(Trivia);
