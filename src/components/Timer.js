import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };

    this.passarTime = this.passarTime.bind(this);
    this.awnserQuestion = this.awnserQuestion.bind(this);
  }

  componentDidMount() {
    const number = 1000;
    setInterval(this.passarTime, number);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      this.awnserQuestion();
    }
  }

  passarTime() {
    this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  awnserQuestion() {
    this.setState({ timer: 30 });
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{timer}</p>
    );
  }
}

export default Timer;
