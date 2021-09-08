import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionCard from '../components/QuestionCard';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const numberQuestions = 5;
    getQuestions(numberQuestions, this.getStorage());
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  handleClick() {
    const penultIndex = 3;
    const { currentQuestion } = this.state;
    if (currentQuestion <= penultIndex) {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    if (questions.length === 0) {
      return <p>Loading</p>;
    }

    return (
      <div>
        Game
        <Header />
        <QuestionCard questionData={ questions[currentQuestion] } />
        <button type="button" onClick={ this.handleClick }>Próxima pergunta</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberQuestions, token) => (
    dispatch(fetchQuestions(numberQuestions, token))
  ),
});

const mapStateToProps = ({ questionsReducer }) => ({
  questions: questionsReducer.questions,
});

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
