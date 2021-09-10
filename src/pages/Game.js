import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../actions';
import { Header, GameScreen } from '../components';

class Game extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     timer: 30,
  //     answer: false,
  //   };
  //   this.setTimer = this.setTimer.bind(this);
  //   this.setAnswer = this.setAnswer.bind(this);
  // }

  // componentDidMount() {
  //   this.setTimer();
  // }

  // setAnswer() {
  //   this.setState({
  //     answer: true,
  //   });
  // }

  // setTimer() {
  //   const ONE_SECOND = 1000;
  //   const TIMER = setInterval(() => {
  //     const { loading, reduxTimer, question } = this.props;
  //     const { timer, answer } = this.state;
  //     if (timer <= 0 || question === true) {
  //       clearInterval(TIMER);
  //     } else if (loading === false) {
  //       this.setState((prevState) => ({
  //         timer: prevState.timer - 1,
  //       }));
  //       // reduxTimer(timer, answer);
  //     }
  //   }, ONE_SECOND);
  // }

  render() {
    const { location: { state: { name } }, timer } = this.props;
    return (
      <>
        <Header name={ name } />
        <GameScreen onClick={ this.setAnswer } />
        <span>{timer}</span>
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  loading: game.isLoading,
  question: game.question,
  timer: game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  reduxTimer: (timer, answer) => dispatch(setTimer(timer, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
