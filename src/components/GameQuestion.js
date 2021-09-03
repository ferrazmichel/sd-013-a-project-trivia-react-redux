import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameCounter from './GameCounter';
import { connect } from 'react-redux';

let index = 0;

class GameQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleQuestion = this.handleQuestion.bind(this);
    this.dispatchCorrectAnswer = this.dispatchCorrectAnswer.bind(this);
  }

  dispatchCorrectAnswer() {
    const { props: { dispatch } } = this;
    console.log('Despachando Type da resposta correta');
    dispatch({ type: 'CORRECT_ANSWER' });
  }

  handleQuestion() {
    const { questions } = this.props;
    const currQuestion = questions[index];

    index += 1;
    const currQuestionOptions = [currQuestion.correct_answer,
      ...currQuestion.incorrect_answers].sort();
    let wrongIndex = 0;
    return (
      <div>
        <div className="question-n-category">
          <h3 data-testid="question-category">{currQuestion.category}</h3>
          <p data-testid="question-text">{currQuestion.question}</p>
        </div>
        <div className="question-options">
          { currQuestionOptions.map((question, questionIndex) => {
            if (question === currQuestion.correct_answer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.dispatchCorrectAnswer }
                >
                  {question}
                </button>);
            }
            wrongIndex += 1;
            return (
              <button
                type="button"
                key={ questionIndex }
                data-testid={ `wrong-answer-${wrongIndex - 1}` }
              >
                {question}
              </button>);
          }) }
        </div>
        <GameCounter />
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        { this.handleQuestion() }
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  loading: userReducer.loading,
  questions: userReducer.questions,
});

GameQuestion.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.objectOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GameQuestion);
