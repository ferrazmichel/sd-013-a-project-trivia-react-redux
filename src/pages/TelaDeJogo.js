import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import nextQuestionSound from '../sound_fx/proxima-pergunta.mp3';
import wrongQuestionSound from '../sound_fx/que-pena.mp3';
import rightQuestionSound from '../sound_fx/certa-resposta.mp3';
import '../styles/telaDeJogo.css';

class TelaDeJogo extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      buttonDisable: false,
      colorBorders: false,
      nextButton: false,
      questionNumber: 0,
      time: 30,
    };

    this.nextSound = new Audio(nextQuestionSound);
    this.wrongSound = new Audio(wrongQuestionSound);
    this.rightSound = new Audio(rightQuestionSound);
  }

  componentDidMount() {
    this.shuffleAnswers();
    this.counter();
  }

  stopTimer() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ buttonDisable: true, colorBorders: true, nextButton: true });
  }

  resetTimer() {
    this.setState({
      buttonDisable: false, colorBorders: false, time: 30, nextButton: false });
    this.counter();
  }

  checkCounter() {
    const { time } = this.state;
    if (time <= 1) {
      this.stopTimer();
    }
  }

  counter() {
    const ONE_SECOND = 1000;
    const count = () => this
      .setState(({ time }) => ({ time: time - 1 }), this.checkCounter());
    const intervalId = setInterval(count, ONE_SECOND);
    this.setState({ intervalId });
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const LAST_QUESTION = 4;
    if (questionNumber < LAST_QUESTION) {
      this.setState((prevState) => (
        { questionNumber: prevState.questionNumber + 1 }
      ), () => {
        this.shuffleAnswers();
        this.nextSound.play();
      });
    } else {
      history.push('/tela-de-feedback');
    }
  }

  savePoints({ target: { id } }) {
    const { questionNumber, time } = this.state;
    const { questions: { results } } = this.props;
    const { difficulty } = results[questionNumber];

    const difficultyPoints = () => {
      const hardPoints = 3;
      const mediumPoints = 2;
      const easyPoints = 1;

      switch (atob(difficulty)) {
      case 'hard':
        return hardPoints;
      case 'medium':
        return mediumPoints;
      case 'easy':
        return easyPoints;
      default:
        return 0;
      }
    };

    if (id === 'correct') {
      const magicMike = 10;
      const points = magicMike + (time * difficultyPoints());
      const { player } = JSON.parse(localStorage.getItem('state'));
      const updatePlayer = {
        player: { ...player,
          assertions: player.assertions + 1,
          score: player.score + points,
        },
      };
      localStorage.setItem('state', JSON.stringify(updatePlayer));
    }
  }

  shuffleAnswers() {
    const { questionNumber } = this.state;
    const { questions: { results } } = this.props;
    const {
      type,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = results[questionNumber];
    const randomIndex = () => {
      if (type === 'boolean') {
        const randomNumber = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        return randomNumber;
      }
      const randomNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0);
      return randomNumber;
    };
    const answers = [...incorrectAnswers];
    answers.splice(randomIndex(), 0, correctAnswer);
    this.setState({ answers });
  }

  createButtons() {
    const { answers, questionNumber } = this.state;
    const { buttonDisable, colorBorders } = this.state;
    const { questions: { results } } = this.props;
    const { correct_answer: correctAnswer } = results[questionNumber];
    return (
      answers.map((answer, index) => {
        if (answer === correctAnswer) {
          return (
            <button
              id="correct"
              data-testid="correct-answer"
              className="answer correct-answer"
              disabled={ buttonDisable }
              type="button"
              key={ answer }
              style={ colorBorders ? { backgroundColor: '#13814A ' } : null }
              onClick={ (event) => {
                this.setState({ colorBorders: true });
                this.savePoints(event);
                this.stopTimer();
                this.rightSound.play();
              } }
            >
              { atob(answer) }
            </button>
          );
        }

        return (
          <button
            data-testid={ `wrong-answer-${index}` }
            className="answer wrong-answer"
            disabled={ buttonDisable }
            type="button"
            key={ answer }
            style={ colorBorders ? { backgroundColor: '#000000 ' } : null }
            onClick={ () => {
              this.setState({ colorBorders: true });
              this.stopTimer();
              this.wrongSound.play();
            } }
          >
            { atob(answer) }
          </button>
        );
      })
    );
  }

  renderNextButton() {
    return (
      <button
        className="next-button"
        type="button"
        onClick={ () => {
          this.nextQuestion();
          this.resetTimer();
        } }
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }

  renderContent() {
    const { score } = JSON.parse(localStorage.getItem('state')).player;
    const { time, questionNumber, nextButton } = this.state;
    const { questions: { results } } = this.props;
    return (
      <main className="gamepage-content">
        <Header score={ score } />
        <section>
          <p
            data-testid="question-category"
          >
            { atob(results[questionNumber].category) }
          </p>
          <p data-testid="question-text">{ atob(results[questionNumber].question) }</p>
          <div className="answers-section">
            { this.createButtons() }
          </div>
          <div>
            {nextButton && this.renderNextButton() }
          </div>
          <div className="question-timer">
            {`Tempo: ${time}`}
          </div>
        </section>
      </main>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions: questions.questions,
});

TelaDeJogo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
}.isRequired;

export default connect(mapStateToProps)(TelaDeJogo);
