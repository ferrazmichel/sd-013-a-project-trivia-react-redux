import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { timeFinished } from '../redux/actions';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 30,
    };
    this.stopTimer = this.stopTimer.bind(this);
    this.zerarCronometro = this.zerarCronometro.bind(this);
  }

  componentDidMount() {
    console.log('criou cronometro');
    const timeout = 5000;
    const interval = 1000;
    this.timer = setTimeout(() => {
      this.intervalId = setInterval(() => {
        const { countdown } = this.state;
        this.setState({
          countdown: countdown - 1,
        });
      }, interval);
    }, timeout);
  }

  // shouldComponentUpdate(nextProps) {
  //   const { choiceSelection } = this.props;
  //   // console.log('nextProps in shouldComponentUpdate at Countdown', nextProps[choiceSelection]);
  //   console.log('nextProps in shouldComponentUpdate at Countdown', nextProps.choiceSelection);
  //   return choiceSelection === nextProps[choiceSelection];
  // }

  componentDidUpdate() {
    const { countdown } = this.state;
    const { boolClickAnswer, handleColor, createButton } = this.props; // handleTimeout estava sendo desestruturado aqui...
    console.log('Booleano no Countdown DidUpdate', boolClickAnswer);
    if (boolClickAnswer === true) {
      console.log('Chamou stopTimer');
      this.stopTimer();
      // clearTimeout(this.timer);
      // clearInterval(this.intervalId);
      // timerFinished(true);
    }
    if (countdown === 0) {
      createButton();
      handleColor();
      this.stopTimer();
    }
  }

  zerarCronometro() {
    this.setState({
      countdown: 30,
    });
  }

  stopTimer() {
    const { timerFinished } = this.props;
    clearTimeout(this.timer); // Para o Set Time out
    clearInterval(this.intervalId); // para o set interval
    timerFinished(true); // Esse booleano vai para as propriedades disabled dos botoes de resposta
  }

  render() {
    const { countdown } = this.state;
    return (
      <span id="timerId">
        { countdown }
      </span>
    );
  }
}

const mapStateToProps = (state) => ({
  timeFinished: state.player.boolTimeout,
});

const mapDispatchToProps = (dispatch) => ({
  timerFinished: (booleano) => dispatch(timeFinished(booleano)),
});

Countdown.propTypes = {
  // handleTimeout: propTypes.func.isRequired,
  timerFinished: propTypes.func,
  handleColor: propTypes.func,
  createButton: propTypes.func,
  boolClickAnswer: propTypes.bool,
  choiceSelection: propTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
