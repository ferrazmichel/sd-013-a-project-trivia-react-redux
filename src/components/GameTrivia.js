import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/Buttons.css';
import { connect } from 'react-redux';

class GameTrivia extends React.Component {
  constructor() {
    super();
    this.handleclick = this.handleclick.bind(this);
  }

  handleclick() {
    const correct = document.querySelector('#correct');
    correct.classList.add('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.add('buttonIncorrect');
      e.disabled = true;
    });
  }

  render() {
    const { questions } = this.props;
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
            onClick={ this.handleclick }
            // className="buttonIncorrect"
          >
            { answer }
          </button>))}
        <button
          key={ questions.correct_answer }
          type="button"
          data-testid="correct-answer"
          id="correct"
          onClick={ this.handleclick }
          // className="buttonCorrect"
        >
          { questions.correct_answer }
        </button>

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
};

const mapStateToProps = (state) => ({
  loading: state.game.isLoading,
});

export default connect(mapStateToProps)(GameTrivia);
