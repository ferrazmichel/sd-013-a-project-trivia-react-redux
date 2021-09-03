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
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.getData = this.getData.bind(this);
    this.tickSecond = this.tickSecond.bind(this);
  }

  componentDidMount() {
    this.getData();
    const MAGIC_NUMBER = 1000;
    this.intervalId = setInterval(this.tickSecond, MAGIC_NUMBER);
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
    alternatives.forEach((alternative) => alternative.classList.toggle('selected'));
  }

  renderHeader() {
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
        <p data-testid="header-score">0</p>
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
          <button type="button">Próxima</button>
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
