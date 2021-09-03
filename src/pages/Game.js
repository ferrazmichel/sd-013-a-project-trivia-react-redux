import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0, // lógica para aparecer cada pergunta
      respondido: false,
    };
    this.checkClick = this.checkClick.bind(this);
  }

  checkClick() {
    this.setState({ respondido: true });
  }

  render() {
    const { index, respondido } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[index];
    const { category, /* type, difficulty, */question,
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
          className={ respondido ? 'correct' : '' }
          onClick={ this.checkClick }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, i) => (
          <button
            type="button"
            key={ i }
            onClick={ this.checkClick }
            className={ respondido ? 'wrong' : '' }
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
  questions: PropTypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
});

export default connect(mapStateToProps, null)(Game);
