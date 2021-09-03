import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DisplayQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }

  render() {
    const { questions } = this.props;
    const { id } = this.state;
    const question = questions[id];
    const NUMBER = 0.5;
    const INDEX_NUM = -1;
    let index = INDEX_NUM;
    let alternatives = [...question.incorrect_answers, question.correct_answer];
    alternatives = alternatives.sort(() => Math.random() - NUMBER);
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <h2 data-testid="question-text">{question.question}</h2>
        <div>

          {alternatives.map((alternative) => {
            if (alternative === question.correct_answer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {alternative}
                </button>);
            }
            index += 1;
            return (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {alternative}
              </button>);
          })}
        </div>
      </div>
    );
  }
}

DisplayQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect()(DisplayQuestion);
