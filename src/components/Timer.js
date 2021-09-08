import React from 'react';

class Cronometer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.cronometer = this.cronometer.bind(this);
  }

  componentDidMount() {
    this.cronometer();
  }

  cronometer() {
    const ONE_SECOND = 200;
    const oi = setInterval(() => {
      this.setState((prevState) => ({ seconds: Math.max(prevState.seconds - 1, 0) }));
      console.log('Intervalo rodando!');
    }, ONE_SECOND);
    setTimeout(() => this.clearCronometer(oi),6000 );
  }

  render() {
    const { seconds } = this.state;

    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

export default Cronometer;
