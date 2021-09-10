import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPoints } from '../redux/actions/index';

import '../Styles/Buttons.css';

class GameTrivia extends React.Component {
  render() {
    const { questions, disabledButton, handleclick } = this.props;
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
        { questions.incorrect_answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            id="incorrect"
            disabled={ disabledButton }
            onClick={ handleclick }
            // className="buttonIncorrect"
          >
            { answer }
          </button>))}
        <button
          key={ questions.correct_answer }
          type="button"
          data-testid="correct-answer"
          id="correct"
          disabled={ disabledButton }
          onClick={ handleclick }
          // className="buttonCorrect"
        >
          { questions.correct_answer }
        </button>
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
