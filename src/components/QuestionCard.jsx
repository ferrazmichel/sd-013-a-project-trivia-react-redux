import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableButtons, pauseTimer, saveScore } from '../redux/actions';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.state = {
      buttons: [],
    };
  }

  componentDidMount() {
    this.renderQuestionButton();
  }

  componentDidUpdate(prevProps) {
    const { questionData } = this.props;
    if (prevProps.questionData !== questionData) {
      this.renderQuestionButton();
    }
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

  handleClick() {
    const { disableQuestions, setButtonVisibility, pause } = this.props;
    const correct = document.querySelector('.correct-answer');
    const incorrects = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < incorrects.length; i += 1) {
      incorrects[i].classList.add('wrong-color');
    }
    correct.classList.add('correct-color');
    disableQuestions(true); // desabilita as alternativas após responder
    setButtonVisibility(); // habilita o botão de prox após clicar na pergunta
    pause(true); // pausa o timer após responder
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  renderQuestionButton() {
    const { questionData } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionData;
    const correctButtons = (
      <button
        key={ correctAnswer }
        className="correct-answer"
        type="button"
        name="question"
        data-testid="correct-answer"
        onClick={ this.handleCorrectAnswer }
      >
        {correctAnswer}
      </button>);
    const wrongButtons = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        name="question"
        className="wrong-answer"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        {answer}
      </button>));

    const allButtons = [...wrongButtons, correctButtons];
    this.shuffleArray(allButtons);
    this.setState({
      buttons: allButtons,
    });
  }

  render() {
    const { questionData, shouldDisableButtons } = this.props;
    const { category, question } = questionData;
    const { buttons } = this.state;
    if (shouldDisableButtons === true) {
      document.getElementsByName('question').forEach((qst) => {
        qst.disabled = true;
      });
    }
    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = ({ questionsReducer }) => ({
  shouldDisableButtons: questionsReducer.disableButtons,
  timer: questionsReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  disableQuestions: (response) => dispatch(disableButtons(response)),
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
  disableQuestions: PropTypes.func.isRequired,
  shouldDisableButtons: PropTypes.bool.isRequired,
  timer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pause: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
  setButtonVisibility: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
