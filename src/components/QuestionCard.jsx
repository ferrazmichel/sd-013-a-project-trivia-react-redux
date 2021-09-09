import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { disableButtons, pauseTimer, saveScore } from '../redux/actions';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  handleClick() {
    const { disable, nextQuestion, pause } = this.props;
    const correct = document.querySelector('.correct-answer');
    const incorrects = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < incorrects.length; i += 1) {
      incorrects[i].classList.add('wrong-color');
    }
    correct.classList.add('correct-color');
    disable(true); // desabilita as alternativas após responder
    nextQuestion(); // habilita o botão de prox após pergunta
    pause(true); // pausa o timer após responder
  }

  handleCorrectAnswer() {
    const { setPoints, timer, questionData: { difficulty } } = this.props;
    this.handleClick();
    let questionLevel = 1;
    if (difficulty === 'medium') {
      questionLevel = 2;
    } else if (difficulty === 'hard') {
      questionLevel += 2;
    }
    const minPoints = 10;
    const points = minPoints + (timer * questionLevel); // calculo da pontuação
    setPoints(points);// envia os pontos pra store
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
        onClick={ this.handleCorrectAnswer }
      >
        {correctAnswer}
      </button>);
    const wrongButtons = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        className="wrong-answer"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        disabled={ handleDisable }
        onClick={ this.handleClick }
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

const mapStateToProps = ({ questionsReducer }) => ({
  handleDisable: questionsReducer.disableButtons,
  timer: questionsReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  disable: (response) => dispatch(disableButtons(response)),
  pause: (response) => dispatch(pauseTimer(response)),
  setPoints: (points) => dispatch(saveScore(points)),
});

QuestionCard.propTypes = {
  questionData: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  disable: PropTypes.func.isRequired,
  handleDisable: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  pause: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
