import React, { Component } from 'react';

class GameCounter extends Component {
  constructor() {
    super();

    this.state = {
      counter: 30,
    };

    this.handleCounterChange = this.handleCounterChange.bind(this);
  }

  async handleCounterChange() {
    const { counter } = this.state;
    const second = 1000;

    setTimeout(() => {
      this.setState({
        counter: counter - 1,
      }, console.log(counter));
    }, second);
  }

  render() {
    const { counter } = this.state;
    this.handleCounterChange();
    return (
      <div>
        {counter}
      </div>
    );
  }
}

export default GameCounter;
