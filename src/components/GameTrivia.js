import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPoints } from '../redux/actions';
import '../Styles/Buttons.css';

class GameTrivia extends React.Component {
  constructor() {
    super();
    this.handleclick = this.handleclick.bind(this);
    this.calculationOfPoints = this.calculationOfPoints.bind(this);
  }

  handleclick(event) {
    if (event.target.id === 'correct') {
      console.log('acertou');
      this.calculationOfPoints(30, 2);
    }
    const correct = document.querySelector('#correct');
    correct.classList.add('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.add('buttonIncorrect');
      e.disabled = true;
    });
  }

  calculationOfPoints(timer, dificuldade) {
    const { setPointsClink } = this.props;
    const TEN = 10;
    const points = TEN + (timer * dificuldade);
    console.log(points);
    setPointsClink(points);
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
  setPointsClink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setPointsClink: (payload) => dispatch(setPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTrivia);
