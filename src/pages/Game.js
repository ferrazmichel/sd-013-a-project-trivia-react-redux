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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      disabledButton: 'none',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const numberQuestions = 5;
    getQuestions(numberQuestions, this.getStorage());
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  handleDisable() {
    this.setState({
      disabledButton: 'inline-block',
    });
  }

  handleClick() {
    const penultIndex = 3;
    const { currentQuestion } = this.state;
    const { disable, handleRestart, handlePause } = this.props;
    if (currentQuestion <= penultIndex) {
      disable(false);
      handleRestart(true);
      handlePause(false);
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    }
    this.handleDisable();
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, disabledButton } = this.state;
    if (questions.length === 0) {
      return <p>Loading</p>;
    }

    return (
      <div>
        Game
        <Header />
        <QuestionCard
          questionData={ questions[currentQuestion] }
          nextQuestion={ this.handleDisable }
        />
        <button
          type="button"
          data-testid="btn-next"
          style={ { display: `${disabledButton}` } }
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
