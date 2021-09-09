import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
} from '../redux/actions/saveCurPlayerScore';
import { fetchQuestions } from '../redux/actions/fetchActions';
import Clock from './timer';
import Answers from './Answers';

class Question extends React.Component {
  componentDidMount() {
    const { getQuestions, token } = this.props;

    getQuestions(token);
  }

  renderQuestions(question) {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    answers.sort();
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.correct_answer}</p>
        <div>
          <Answers answers={ answers } correctAnswer={ question.correct_answer } />
        </div>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) return <p>Loading...</p>;
    const questionMap = questions.map((question) => this.renderQuestions(question));
    return (
      <div>
        {questionMap[0]}
        <Clock />
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.func,
  questions: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.fetchReducer.questions,
  token: state.fetchReducer.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(fetchQuestions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
