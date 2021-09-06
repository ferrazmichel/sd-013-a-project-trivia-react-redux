import React, { Component } from 'react';
import { decode } from 'html-entities';

class AnswersButton extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.buttonsAnswers = this.buttonsAnswers.bind(this);
  }

  componentDidMount() {
    this.buttonsAnswers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.buttonsAnswers();
    }
  }

  buttonsAnswers() {
    const { correct, incorrect, onClick } = this.props;
    // source https://stackoverflow.com/a/46545530
    const answers = [...incorrect, correct]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    const buttons = answers.map((answer, key) => (
      <button
        onClick={ (event) => onClick(event) }
        type="button"
        key={ key }
        className="answer"
        data-testid={ answer === correct ? 'correct-answer'
          : `wrong-answer-${incorrect.findIndex((inc) => inc === answer)}` }
        value={ answer === correct ? 'correct' : 'incorrect' }
      >
        { decode(answer) }
      </button>
    ));
    this.setState({ questions: buttons });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        { questions }
      </div>
    );
  }
}

export default AnswersButton;
