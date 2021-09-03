import React from 'react';
import QuestionCard from '../components/QuestionCard';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      currentQuestion: 0,
      loading: true,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    const numberQuestions = 5;
    this.fetchQuestions(numberQuestions, this.getStorage());
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  async fetchQuestions(numberQuestions, token) {
    const resultQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
    const resultJson = await resultQuestions.json();
    console.log(resultJson.results);
    this.setState({
      questionList: resultJson.results,
      loading: false,
    });
  }

  render() {
    const { questionList, currentQuestion, loading } = this.state;

    console.log(questionList);
    return (
      <div>
        Game
        {/* { loading
          ? <p> Loading...</p>
          : <QuestionCard questionData={ questionList[currentQuestion] } /> } */}
      </div>
    );
  }
}

export default Game;
