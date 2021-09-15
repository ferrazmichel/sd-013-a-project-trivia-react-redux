import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
import { connect } from 'react-redux';

class Questions extends React.Component {
  constructor() {
    super();

    this.isAnswered = this.isAnswered.bind(this);
    this.isCompleted = this.isCompleted.bind(this);
    this.decodeHtml = this.decodeHtml.bind(this);
  }

  isAnswered(className) {
    const { trivia: { answered } } = this.props;
    return answered ? className : '';
  }

  isCompleted() {
    const { trivia: { answered } } = this.props;
    return answered;
  }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const {
      trivia: { questions },
      id,
      sumScore,
      changeState,
    } = this.props;

    if (questions.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <p>
          Category:
          <span data-testid="question-category">{questions[id].category}</span>
        </p>
        <p>
          Question:
          <span data-testid="question-text">
            {this.decodeHtml(questions[id].question)}
          </span>
        </p>
        <ul>
          <li>
            <button
              type="button"
              data-testid="correct-answer"
              onClick={ sumScore }
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
                onClick={ changeState }
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
  trivia: PropTypes.shape(PropTypes.obj).isRequired,
  id: PropTypes.string.isRequired,
  questions: PropTypes.shape(PropTypes.obj).isRequired,
  sumScore: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Questions);
