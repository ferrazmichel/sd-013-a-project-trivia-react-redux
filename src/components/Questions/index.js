import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchApiQuestions } from '../../actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.isAnswered = this.isAnswered.bind(this);
    this.isCompleted = this.isCOmplete.bind(this);

  }
  componentDidMount() {
    const { trivia: { token }, apiQuestions } = this.props;
    apiQuestions(token);
  }

  isAnswered(className) {
    const { trivia: { answered } } = this.props;
    return answered ? className : '';
  }

  isCompleted() {
    const { trivia: { answered } } = this.props;
    return answered;
  }

  render() {
    const { trivia: { questions }, id } = this.props;

    return (
      <div>
        <p>
          Category:
          <span data-testid="question-category">{questions[id].category}</span>
        </p>
        <p>
          Question:
          <span data-testid="question-text">{questions[id].question}</span>
        </p>
        <ul>
          <li>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ this.sumScore }
              className={ this.isAnswered('correct') }
              disabled={ this.isCompleted() }
            >
              {questions[id].correct_answer}
            </button>
          </li>
          {questions[id].incorrect_answers.map((incorrect, i) => (
            <li key={ i }>
              <button
                type="button"
                data-testid={ `wrong-answer-${i}` }
                onClick={ this.changeState }
                className={ this.isAnswered('incorrect') }
                disabled={ this.isCompleted() }
              >
                {incorrect}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Questions.propTypes = {
  apiQuestions: PropTypes.func,
  token: PropTypes.string,
  answered: PropTypes.string,
  questions: PropTypes.obj,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => ({
  apiQuestions: (token) => dispatch(fetchApiQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
