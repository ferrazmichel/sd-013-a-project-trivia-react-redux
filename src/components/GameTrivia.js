import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeDisabled } from '../redux/actions/index';
import { setPoints } from '../redux/actions';
import '../Styles/Buttons.css';

class GameTrivia extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };

    this.handleclick = this.handleclick.bind(this);
    this.cronometerInterval = this.cronometerInterval.bind(this);
    this.disabledButtons = this.disabledButtons.bind(this);
        this.calculationOfPoints = this.calculationOfPoints.bind(this);
  }

  componentDidMount() {
    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      this.cronometerInterval();
    }, FIVE_SECONDS);
  }

  componentDidUpdate() {
    this.disabledButtons();
  }

  handleclick(event) {
    if (event.target.id === 'correct') {
      // Esperando os dados do temporizado para calcular corretamente.
      const NUMBER = 30;
      this.calculationOfPoints(NUMBER, 2);
    }
    const correct = document.querySelector('#correct');
    correct.classList.add('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.add('buttonIncorrect');
      e.disabled = true;
    });
    const next = document.querySelector('#next');
    next.disabled = false;
    next.classList.remove('nextbtn');
     clearInterval(this.interval);
  }

  // Função recebe o tempo restante e o dificuldade.
  calculationOfPoints(timer, dificuldade) {
    const { setPointsClink } = this.props;
    const TEN = 10;
    const points = TEN + (timer * dificuldade);
    setPointsClink(points);
  }

  cronometerInterval() {
    const { seconds } = this.state;
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      if (seconds === 0) {
        this.setState({ seconds: 30 });
      } else {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      }
    }, ONE_SECOND);
  }

  disabledButtons() {
    const { change } = this.props;
    const { seconds } = this.state;
    const MIN_SECONDS = 0;
    if (seconds === MIN_SECONDS) {
      clearInterval(this.interval);
      const disabledButton = true;
      change(disabledButton);
      this.setState({
        seconds: 30,
      });
    }
  }

  render() {
    const { questions, disabledButton } = this.props;
    const { seconds } = this.state;
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
          disabled={ disabledButton }
          onClick={ this.handleclick }
          // className="buttonCorrect"
        >
          { questions.correct_answer }
        </button>
        <section>
          <p>{seconds}</p>
        </section>
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
  change: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  setPointsClink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.game.isLoading,
  disabledButton: state.game.disabledButton,
});

const mapDispatchToProps = (dispatch) => ({
  change: (payload) => dispatch(changeDisabled(payload)),
  setPointsClink: (payload) => dispatch(setPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTrivia);
