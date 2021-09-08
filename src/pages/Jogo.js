import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTriviaApi } from '../utils/utils';
import JogoHeader from '../components/JogoHeader';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentIndex: 0,
      isLoading: true,
      seconds: 30,
      player: {
        name: props.name,
        assertions: 0,
        score: 0,
        gravatarEmail: props.email,
      },
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getData = this.getData.bind(this);
    this.tickSecond = this.tickSecond.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.startClock = this.startClock.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.startClock();
    this.setPlayerLocalStorage();
  }

  async getData() {
    const { token } = this.props;
    const data = await getTriviaApi(token);
    console.log(data);

    this.setState({
      questions: data,
      isLoading: false,
    });
  }

  setPlayerLocalStorage() {
    const { player } = this.state;
    const objectPlayer = {
      player,
    };
    localStorage.setItem('state', JSON.stringify(objectPlayer));
  }

  startClock() {
    const MAGIC_NUMBER = 1000;
    this.setState({
      seconds: 30,
    });
    this.intervalId = setInterval(this.tickSecond, MAGIC_NUMBER);
  }

  tickSecond() {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      clearInterval(this.intervalId);
      const nextBtn = document.getElementById('next');
      nextBtn.hidden = false;
    }
  }

  handleClickAnswer(event) {
    const { target } = event;
    const alternatives = [...target.parentElement.children];
    alternatives.forEach((alternative) => alternative.classList.add('selected'));
    if (target.classList.contains('correct')) {
      this.calculateScore();
    }
    const nextBtn = document.getElementById('next');
    nextBtn.hidden = false;
  }

  handleClickNext() {
    const { currentIndex } = this.state;
    const NUMBER_OF_QUESTIONS = 4;
    if (currentIndex < NUMBER_OF_QUESTIONS) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
      }), () => this.startClock());
      const containerAlternatives = document.getElementById('alternatives-container');
      const alternatives = [...containerAlternatives.children];
      alternatives.forEach((alternative) => alternative.classList.remove('selected'));
      const nextBtn = document.getElementById('next');
      nextBtn.hidden = true;
      clearInterval(this.intervalId);
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  calculateScore() {
    const MINIMUN_SCORE = 10;
    const { questions, currentIndex, seconds } = this.state;
    const currentQuestion = questions[currentIndex];
    const { difficulty } = currentQuestion;
    const difficultValue = this.switchDifficult(difficulty);
    const assertionScore = MINIMUN_SCORE + (seconds * difficultValue);
    const { name, email } = this.props;
    this.setState((prevState) => ({
      player: {
        name,
        assertions: prevState.player.assertions + 1,
        score: prevState.player.score + assertionScore,
        gravatarEmail: email,
      },
    }), this.setPlayerLocalStorage);
  }

  switchDifficult(difficulty) {
    const HARD_VALUE = 3;
    const MEDIUM_VALUE = 2;
    const EASY_VALUE = 1;
    switch (difficulty) {
    case 'hard':
      return HARD_VALUE;
    case 'medium':
      return MEDIUM_VALUE;
    case 'easy':
      return EASY_VALUE;
    default:
      return 0;
    }
  }

  renderNextButton() {
    return (
      <button
        id="next"
        data-testid="btn-next"
        type="button"
        onClick={ this.handleClickNext }
        hidden
      >
        Próxima
      </button>
    );
  }

  renderQuestions() {
    const { questions, currentIndex, seconds } = this.state;
    const currentQuestion = questions[currentIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const alternatives = [...currentQuestion.incorrect_answers, correctAnswer];
    const sortAlternatives = alternatives.sort();
    return (
      <div>
        <div>
          <h2 data-testid="question-category">{ currentQuestion.category }</h2>
          <p data-testid="question-text">{ currentQuestion.question }</p>
          <p>
            Tempo:
            {' '}
            { seconds }
          </p>
        </div>
        <div id="alternatives-container">
          {sortAlternatives.map((alternative, index) => {
            if (alternative === correctAnswer) {
              return (
                <button
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  className="correct"
                  onClick={ this.handleClickAnswer }
                  disabled={ seconds === 0 }
                >
                  { alternative }
                </button>
              );
            }
            return (
              <button
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
                className="incorrect"
                onClick={ this.handleClickAnswer }
                disabled={ seconds === 0 }
              >
                { alternative }
              </button>);
          })}
          { this.renderNextButton() }
        </div>
      </div>
    );
  }

  render() {
    const { player: { score }, isLoading } = this.state;
    return (
      <div>
        { (!isLoading && <JogoHeader score={ score } />) }
        { (!isLoading && this.renderQuestions()) }
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.game.player.gravatarEmail,
  name: state.game.player.name,
  token: state.game.token,
});

export default connect(mapStateToProps, null)(Jogo);
