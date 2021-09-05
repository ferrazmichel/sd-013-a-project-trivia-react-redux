import React from 'react';
import './style.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsArray: [],
      answered: false,
      id: 0,
      time: {},
      seconds: 30,
      difficulty: '',
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
    this.isAnswered = this.isAnswered.bind(this);
    this.next = this.next.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.timerMount = this.timerMount.bind(this);
    this.linkOrNext = this.linkOrNext.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.timerMount();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    const { results } = json;
    this.setState({ questionsArray: results });
  }

  timerMount() {
    const { seconds } = this.state;
    const number = 1000;
    const timeLeftVar = this.secondsToTime(seconds);
    this.setState({ time: timeLeftVar });
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, number);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const { answered } = this.state;
    if (!answered) {
      const { seconds } = this.state;
      const second = seconds - 1;
      this.setState({
        time: this.secondsToTime(second),
        seconds: second,
      });
      // Check if we're at zero.
      if (second === 0) {
        clearInterval(this.timer);
        this.setState({ answered: true });
      }
    }
  }

  secondsToTime(secs) {
    const sixty = 60;
    const hours = Math.floor(secs / (sixty * sixty));

    const divisorForMinute = secs % (sixty * sixty);
    const minutes = Math.floor(divisorForMinute / sixty);

    const divisorForSecond = divisorForMinute % sixty;
    const seconds = Math.ceil(divisorForSecond);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  changeState() {
    this.setState({
      answered: true,
    });
  }

  isAnswered(className) {
    const { answered } = this.state;
    return answered ? className : '';
  }

  isCompleted() {
    const { answered } = this.state;
    return answered;
  }

  next() {
    const maxId = 4;
    const number = 1000;
    const { id, seconds } = this.state;
    if (id !== maxId) {
      this.setState({
        id: id + 1,
        answered: false,
        time: {
          s: 30,
        },
        seconds: 30,
      });
      this.countDown();
      if (seconds === 0) {
        this.timer = setInterval(this.countDown, number);
      }
    }
  }

  linkOrNext() {
    const { id } = this.state;
    const maxId = 4;
    if (id === maxId) {
      window.open('/feedback', '_self');
    }
    this.next();
  }

  async sumScore() {
    this.changeState();
    const { questionsArray, id } = this.state;
    await this.setState({ difficulty: questionsArray[id].difficulty });
    const { seconds, difficulty } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));

    const ten = 10;
    const three = 3;

    switch (difficulty) {
    case 'easy':
      state.player.score += ten + (seconds);
      break;
    case 'medium':
      state.player.score += ten + (seconds * 2);
      break;
    case 'hard':
      state.player.score += ten + (seconds * three);
      break;
    default: return;
    }

    await localStorage.setItem('state', JSON.stringify(state));

    console.log(`dificuldade ${difficulty}`);
    console.log(`seconds ${difficulty}`);
    console.log(`total: ${state.player.score}`);
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.linkOrNext }
        data-testid="btn-next"
      >
        Pŕoxima
      </button>
    );
  }

  render() {
    const { time: { s } } = this.state;
    const { questionsArray, id, answered } = this.state;
    if (questionsArray.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <p>
            Category:
            <span data-testid="question-category">{questionsArray[id].category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{questionsArray[id].question}</span>
          </p>
          <ul>
            <li>
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.sumScore }
                className={ this.isAnswered('correct') }
                disabled={ this.isCompleted() }
              >
                {questionsArray[id].correct_answer}
              </button>
            </li>
            {questionsArray[id].incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.changeState }
                  className={ this.isAnswered('incorrect') }
                  disabled={ this.isCompleted() }
                >
                  {incorrect}
                </button>
              </li>
            ))}
          </ul>
          <div>
            { s }
          </div>
        </div>
        {answered && this.renderButton()}
      </div>
    );
  }
}

export default Questions;
