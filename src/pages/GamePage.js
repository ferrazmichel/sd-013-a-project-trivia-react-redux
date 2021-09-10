import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeDisabled, fetchQuestionsThunk, setPoints } from '../redux/actions/index';
import GameTrivia from '../components/GameTrivia';
import '../Styles/Buttons.css';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnShouldExist: false,
      index: 0,
    };

    this.fetchThunk = this.fetchThunk.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.calculationOfPoints = this.calculationOfPoints.bind(this);
    // this.createBtnNext = this.createBtnNext.bind(this);
  }

  componentDidMount() {
    this.fetchThunk();
  }

  // componentDidUpdate() {
  //   this.disableBtn();
  // }

  /* async fetchQuestions() {

    const questionsFetch =  await getQuestionsFetch();
    this.setState({
      questions: questionsFetch.results,
      loading: false,
    });
  } */

  calculationOfPoints(timer, dificuldade) {
    const { setPointsClink } = this.props;
    const assertions = 1;
    const TEN = 10;
    const score = TEN + (timer * dificuldade);
    setPointsClink({ score, assertions });
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
    clearInterval(this.interval);
    this.setState({
      btnShouldExist: true,
    });
  }

  disableBtn() {
    this.setState({
      btnShouldExist: false,
    });
    const correct = document.querySelector('#correct');
    correct.classList.remove('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.remove('buttonIncorrect');
      e.disabled = false;
    });
  }

  async fetchThunk() {
    const { getQuestionsThunk } = this.props;
    await getQuestionsThunk();
  }

  handleNextQuestion() {
    const { change, history } = this.props;
    let { disabledButton } = this.props;
    const { index } = this.state;
    const FOUR = 4;
    if (index === FOUR) {
      this.setState({ index: 4 });
      history.push('/feedback');
    } else {
      this.setState({ index: index + 1 });
    }
    disabledButton = false;
    change(disabledButton);
  }

  render() {
    const { index, btnShouldExist } = this.state;
    const { questions, loading } = this.props;
    if (loading === true) return <h1>Carregando as perguntas</h1>;
    return (
      <div>
        <Header />
        <GameTrivia questions={ questions[index] } handleclick={ this.handleclick } />
        <button
          type="button"
          onClick={ () => {
            this.handleNextQuestion();
            this.disableBtn();
          } }
          id="next"
          className={ btnShouldExist ? '' : 'nextbtn' }
          data-testid="btn-next"
        >
          Próxima Pergunta
        </button>
      </div>

    );
  }
}

GamePage.propTypes = {
  getQuestionsThunk: PropTypes.func.isRequired,
  questions: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf({}).isRequired,
  setPointsClink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.isLoading,
  token: state.game.token,
  disabledButton: state.game.disabledButton,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsThunk: () => dispatch(fetchQuestionsThunk()),
  change: (payload) => dispatch(changeDisabled(payload)),
  setPointsClink: (payload) => dispatch(setPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
