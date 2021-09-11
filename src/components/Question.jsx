import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions/fetchActions';
import Answers from './Answers';
import decodeHtml from '../helpers/decodeHTML';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token } = this.props;

    getQuestions(token);
  }

  nextQuestion() {
    this.setState((id) => ({
      id: id.id + 1,
    }));
  }

  renderQuestions(question) {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    answers.sort();
    return (
      <>
        <p
          data-testid="question-category"
          className="question-category"
        >
          {question.category}
        </p>
        <p
          data-testid="question-text"
          className="question-text"
        >
          { decodeHtml(question.question) }
        </p>

        <Answers
          nextQuestion={ this.nextQuestion }
          answers={ answers }
          correctAnswer={ question.correct_answer }
          difficulty={ question.difficulty }
        />

      </>
    );
  }

  render() {
    const { questions } = this.props;
    const { id } = this.state;
    const questionsLimit = 5;
    if (questions.length === 0) return <p>Loading...</p>;
    if (id === questionsLimit) return <Redirect to="/feedback" />;
    const questionMap = questions.map((question) => this.renderQuestions(question));
    return (
      questionMap[id]
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
