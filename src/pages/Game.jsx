import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../components';
import { fetchQuestions } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
    this.changeIndex = this.changeIndex.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  async componentDidMount() {
    const { questions, token } = this.props;
    questions(token.token);
  }

  // the function below was inspired by: source https://stackoverflow.com/a/12646864

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i - 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  changeIndex() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  render() {
    const { gameQuestions } = this.props;
    const { index } = this.state;
    if (gameQuestions.length === 0) return <p>loading...</p>;
    const { question, correct_answer: correctAnswer, category, incorrect_answers } = gameQuestions[index];
    const randomAnswers = this.shuffleArray([...incorrect_answers, correctAnswer]);
    const indexWrongAnswers = (answer) => incorrect_answers.findIndex((inc) => inc === answer);
    return (
      <div>
        <header><Header /></header>
        <section>
          <div data-testid="question-category">
            { category }
          </div>
          <div data-testid="question-text">
            { question }
          </div>
          {/* {randomAnswers.map((answer, key) => {
            if (answer === correctAnswer) {
              return <button type="button" key={ key } data-testid="correct-answer">{answer}</button>;
            }
            return <button type="button" key={ key } data-testid={ `wrong-answer-${() => indexWrongAnswers(answer)}` }>{answer}</button>;
          })} */}
          <button type="button" onClick={ () => this.changeIndex() }>NEXT</button>
          {/* <button>{`${perguntas[indice].correct_answer}`}</button> */}
          {/* <p>{questions[1]}</p> */}
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (payload) => dispatch(fetchQuestions(payload)),
});
const mapStateToProps = (state) => ({
  token: state.users.token,
  gameQuestions: state.game.questions,
  // index: state.game.index,
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
