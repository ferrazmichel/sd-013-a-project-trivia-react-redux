import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Header, QuestionCard } from '../components';
import {
  disableButtons,
  fetchQuestions,
  pauseTimer,
  restartTimer,
} from '../redux/actions';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      isHidden: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setButtonVisibility = this.setButtonVisibility.bind(this);
    this.saveRanking = this.saveRanking.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const numberQuestions = 5;
    getQuestions(numberQuestions, this.getStorage());
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  setButtonVisibility() {
    const { isHidden } = this.state;
    this.setState({
      isHidden: !isHidden,
    });
  }

  handleClick() {
    const penultIndex = 3;
    const { currentQuestion } = this.state;
    const { disable, handleRestart, handlePause } = this.props;
    if (currentQuestion <= penultIndex) {
      disable(false); // habilita as alternativas ao clicar em prox
      handleRestart(true);
      handlePause(false);
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    } else {
      const { history } = this.props;
      this.saveRanking();
      history.push('/feedback');
    }
    this.setButtonVisibility(); // desabilita o botão de prox após clicar em prox
  }

  saveRanking() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const rankObj = {
      name,
      score,
      picture,
    };
    const previousRanking = JSON.parse(localStorage.getItem('ranking'));
    if (previousRanking !== null) {
      localStorage.ranking = JSON.stringify([...previousRanking, rankObj]);
    } else {
      localStorage.ranking = JSON.stringify([rankObj]);
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, isHidden } = this.state;
    if (questions.length === 0) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <h1>
          Game
        </h1>
        <div className="game">
          <Header />
          <QuestionCard
            questionData={ questions[currentQuestion] }
            qstIndex={ currentQuestion }
            setButtonVisibility={ this.setButtonVisibility }
          />
          <Timer setButtonVisibility={ this.setButtonVisibility } />
          <button
            type="button"
            data-testid="btn-next"
            hidden={ isHidden }
            onClick={ this.handleClick }
            className="button-next"
          >
            Próxima pergunta
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberQuestions, token) => (
    dispatch(fetchQuestions(numberQuestions, token))
  ),
  disable: (response) => dispatch(disableButtons(response)),
  handleRestart: (response) => dispatch(restartTimer(response)),
  handlePause: (response) => dispatch(pauseTimer(response)),
});

const mapStateToProps = ({ questionsReducer, player }) => ({
  questions: questionsReducer.questions,
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  disable: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRestart: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
