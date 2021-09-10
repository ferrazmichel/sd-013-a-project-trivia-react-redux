import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPoints } from '../redux/actions/index';

import '../Styles/Buttons.css';

class GameTrivia extends React.Component {
  constructor(props) {
    super(props);

    this.randOrd = this.randOrd.bind(this);
    this.renderRandomQuestions = this.renderRandomQuestions.bind(this);
  }

  // https://leocaseiro.com.br/shuffle-do-php-no-javascript/
  randOrd() {
    const ZERO_FIVE = 0.5;
    return (Math.round(Math.random()) - ZERO_FIVE);
  }

  renderRandomQuestions() {
    const { questions, disabledButton, handleclick } = this.props;
    const questionsAnswers = [questions.correct_answer, ...questions.incorrect_answers];
    const randomAnswers = questionsAnswers.sort(this.randOrd);
    return (
      <div>
        { randomAnswers.map((answer, index) => {
          if (answer === questions.correct_answer) {
            return (
              <button
                key={ questions.correct_answer }
                type="button"
                data-testid="correct-answer"
                id="correct"
                disabled={ disabledButton }
                onClick={ handleclick }
              // className="buttonCorrect"
              >
                { answer }
              </button>);
          }
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              id="incorrect"
              disabled={ disabledButton }
              onClick={ handleclick }
            >
              { answer }
            </button>);
        })}
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <form>
        <p
          key={ questions.category }
          data-testid="question-category"
        >
          Categoria:
          {' '}
          {questions.category}
        </p>
        <p
          key={ questions.question }
          data-testid="question-text"
        >
          Pergunta:
          {' '}
          { questions.question }
        </p>
        { this.renderRandomQuestions() }
        <section />
      </form>
    );
  }
}

GameTrivia.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf({}).isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  disabledButton: PropTypes.bool.isRequired,
  handleclick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  disabledButton: state.game.disabledButton,
});

const mapDispatchToProps = (dispatch) => ({
  setPointsClink: (payload) => dispatch(setPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTrivia);
