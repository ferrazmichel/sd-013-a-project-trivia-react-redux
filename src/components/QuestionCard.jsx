import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { disableButtons } from '../redux/actions';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.alteraCor = this.alteraCor.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  alteraCor() {
    const { disable } = this.props;
    const correct = document.getElementsByClassName('correct-answer')[0];
    const incorrects = document.getElementsByClassName('wrong-answer');
    for (let i = 0; i < incorrects.length; i += 1) {
      incorrects[i].classList.add('wrong-color');
    }
    correct.classList.add('correct-color');
    disable();
  }

  renderQuestionButton() {
    const { questionData, handleDisable } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionData;
    const correctButtons = (
      <button
        key={ correctAnswer }
        className="correct-answer"
        type="button"
        data-testid="correct-answer"
        disabled={ handleDisable }
        onClick={ this.alteraCor }
      >
        {correctAnswer}
      </button>);
    const wrongButtons = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        className="wrong-answer"
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        disabled={ handleDisable }
        onClick={ this.alteraCor }
      >
        {answer}
      </button>));

    const allButtons = [...wrongButtons, correctButtons];
    this.shuffleArray(allButtons);

    return allButtons;
  }

  render() {
    const { questionData } = this.props;
    const { category, question } = questionData;

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        {this.renderQuestionButton()}
        <Timer />
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questionData: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  disable: PropTypes.func.isRequired,
  handleDisable: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ questionsReducer }) => ({
  handleDisable: questionsReducer.disableButtons,
});

const mapDispatchToProps = (dispatch) => ({
  disable: () => dispatch(disableButtons()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
