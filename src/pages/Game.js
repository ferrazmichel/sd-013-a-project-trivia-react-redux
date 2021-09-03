import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0, // lógica para aparecer cada pergunta
    };
  }

componentDidMount() {
  const { fetchQuest } = this.props,
  fetchQuest('b61fd17daa5e8de8029810644d0292c50630722206e6c13ccbdfa4ea4f0fc7c3');
}

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[index];
    const { category, type, difficulty, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;
    return (
      <main>
        <Header />
        <h2
          data-testid="question-category"
        >
          {category}
        </h2>
        <h3
          type="button"
          data-testid="question-text"
        >
          {question}
        </h3>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct"
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ `wrong-answer-${i}` }
          >
            {answer}
          </button>
        ))}
      </main>
    );
  }
}

Game.propTypes = {
  //  questions: PropTypes.arrayOf(PropTypes.object({})).isRequired,
};

const mapDispatchToState = (dispatch) => ({
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
});

export default connect(mapStateToProps, mapDispatchToState)(Game);
