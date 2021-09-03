import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchApiQuestions } from '../../actions';

class Questions extends React.Component {
  componentDidMount() {
    const { token, apiQuestions } = this.props;
    apiQuestions(token);
  }

  render() {
    const { questions } = this.props;

    return (
      <div>
        {
          questions.map((question, index) => (
            <div key={ index }>
              <p>
                Category:
                <span data-testid="question-category">{question.category}</span>
              </p>
              <p>
                Question:
                <span data-testid="question-text">{question.question}</span>
              </p>
              <ul>
                <li key={ index }>
                  <button type="button" data-testid="correct-answer">
                    {question.correct_answer}
                  </button>
                </li>
                {question.incorrect_answers.map((incorrect, i) => (
                  <li key={ i }>
                    <button type="button" data-testid={ `wrong-answer-${i}` }>
                      {incorrect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))

        }
      </div>
    );
  }
}

Questions.propTypes = {
  apiQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.trivia.token,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token) => dispatch(fetchApiQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
