import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOptions } from '../redux/actions';
import Options from '../componets/Options';
import Header from '../componets/Header';
import Timer from '../componets/Timer';

class GameScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 0,
      done: false,
      timer: 30,
    };

    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
    this.startCountdown();
    this.resetLocal();
  }

  resetLocal() {
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = 0;
    localStorage.setItem('state', JSON.stringify(state));
  }

  async fetchQuestion() {
    const { setOption } = this.props;
    const tokenGet = localStorage.getItem(('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenGet}`);
    const questionsApi = await fetchQuestions.json();
    const questionJson = await questionsApi.results;
    localStorage.setItem('questions', JSON.stringify(questionJson));
    this.setState({ questions: questionJson });
    setOption(questionJson); 
  }

  handleClick() {
    const next = document.querySelector('#nextButton');
    const { contador } = this.state;
    const correto = document.querySelector('#correct');
    const incorretos = document.querySelectorAll('#incorrect');
    this.setState({
      done: false,
      contador: contador + 1,
      timer: 30,
    });
    correto.classList.remove('correct');
    incorretos.forEach((incorreto) => incorreto.classList.remove('incorrect'));
    next.classList.remove('next');
    next.classList.add('nextDisabled');
  }

  startCountdown() {
    const ONE_SECOND = 1000;
    const updateState = () => {
      const next = document.querySelector('#nextButton');
      const { timer, done } = this.state;
      if (!done) {
        if (timer > 0) {
          this.setState((prevState) => ({ timer: prevState.timer - 1 }));
        } else {
          clearInterval(updateState);
          this.setState({ done: true });
          next.classList.add('next');
          next.classList.remove('nextDisabled');
        }
      } else {
        this.setState({ timer: 30 });
      }
    };
    setInterval(updateState, ONE_SECOND);
  }

  render() {
    const { questions, timer } = this.state;
    if (!questions) return 'loading...';
    return (
      <div>
        <div>
          <Header />
          <Link to="/">Back</Link>
          <Options
            question={ questions[contador] }
          />
        </div>
        <Timer timer={ timer } />
        <button
          className="nextDisabled"
          id="nextButton"
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-next"
        >
          Next
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setOption: (payload) => dispatch(setOptions(payload)),
})

export default connect(null, mapDispatchToProps)(GameScreen);
