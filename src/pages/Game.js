import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';
import Header from '../components/Header';
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
    this.handleLoadButtons = this.handleLoadButtons.bind(this);
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
    disable(false);
    if (currentQuestion <= penultIndex) {
      handleRestart(true);
      handlePause(false);
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setButtonVisibility(); // desabilita o botão de prox após clicar em prox
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, isHidden } = this.state;
    if (questions.length === 0) {
      return <p>Loading</p>;
    }

    return (
      <div>
        Game
        <Header />
        <QuestionCard
          questionData={ questions[currentQuestion] }
          setButtonVisibility={ this.setButtonVisibility }
          handleLoadButtons={ this.handleLoadButtons }

        />
        <Timer setButtonVisibility={ this.setButtonVisibility } />
        <button
          type="button"
          data-testid="btn-next"
          hidden={ isHidden }
          onClick={ this.handleClick }
        >
          Próxima pergunta
        </button>
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

const mapStateToProps = ({ questionsReducer }) => ({
  questions: questionsReducer.questions,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
