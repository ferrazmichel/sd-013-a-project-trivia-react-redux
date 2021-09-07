import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAvatar, getTriviaApi } from '../utils/utils';

class Jogo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      currentIndex: 0,
      isLoading: true,
      seconds: 30,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getData = this.getData.bind(this);
    this.tickSecond = this.tickSecond.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    this.getData();
    const MAGIC_NUMBER = 1000;
    this.intervalId = setInterval(this.tickSecond, MAGIC_NUMBER);
    const { player } = this.state;
    const objectPlayer = {
      player,
    };
    localStorage.setItem('state', JSON.stringify(objectPlayer));
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

  tickSecond() {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      clearInterval(this.intervalId);
    }
  }

  handleClickAnswer(event) {
    const { target } = event;
    const alternatives = [...target.parentElement.children];
    console.log(alternatives);
    alternatives.forEach((alternative) => alternative.classList.add('selected'));
    if (target.classList.contains('correct')) {
      this.calculateScore();
    }
    const nextBtn = document.getElementById('next');
    nextBtn.hidden = false;
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
      player: ({
        name,
        assertions: prevState.player.assertions + 1,
        score: prevState.player.score + assertionScore,
        gravatarEmail: email,
      }),
    }), () => {
      const { player } = this.state;
      const objectPlayer = {
        player,
      };
      localStorage.setItem('state', JSON.stringify(objectPlayer));
    });
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

  renderHeader() {
    const { player: { score } } = this.state;
    const { name, email } = this.props;
    const gravatar = fetchAvatar(email);
    return (
      <header>
        <div>
          <img
            src={ gravatar }
            alt={ `${name} Avatar` }
            data-testid="header-profile-picture"
          />
        </div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
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
        <div>
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
          <button id="next" data-testid="btn-next" type="button" hidden>Próxima</button>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        { this.renderHeader() }
        { (!isLoading && this.renderQuestions()) }
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.game.player.gravatarEmail,
  name: state.game.player.name,
  token: state.game.token,
});

export default connect(mapStateToProps, null)(Jogo);
