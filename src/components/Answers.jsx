import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveScoreOnStore from '../redux/actions/saveCurPlayerScore';
import Clock from './timer';

import './Button.css';
import NextButton from './NextButton';

class Answers extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      disable: false,
      correctColor: 'defaultColor',
      wrongColor: 'defaultColor',
    };

    this.addScoreOnClick = this.addScoreOnClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyClock = this.verifyClock.bind(this);

  }

  disableButtom() {
   this.setState({
    disable: true,
    correctColor: 'correctColor',
    wrongColor: 'wrongColor',
    });
  }

  
  async addScoreOnClick(clock, difficulty) {
    console.log(clock)
    const result = 10 + (clock * 2)
    const { addScoreOnStore } = this.props;
    addScoreOnStore(result);
  }

  handleClick({ target }, correctAnswer) {
    if (target.value === correctAnswer) {
      this.addScoreOnClick(target.clock, target.difficulty);
    }
    this.disableButtom()
  }

  verifyClock() {
    this.disableButtom()
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { correctColor, wrongColor, disable } = this.state;
    return (
      <div>
        {answers.map((answer, index) => (
        <button
          type="button"
          disabled={ disable }
          key={ answer }
          value={ answer }

          data-testid={ correctAnswer === answers[index]
            ? 'correct-answer' : `wrong-answer-${index}` }

          onClick={ (e) => this.handleClick(e, correctAnswer) }
          className={ correctAnswer === answers[index] ? correctColor : wrongColor }

          difficulty={answer.difficulty}
        >
          {answer}
        </button>))}
        <Clock verifyClock={ this.verifyClock }/>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addScoreOnStore: (payload) => dispatch(saveScoreOnStore(payload)),
});

export default connect(null, mapDispatchToProps)(Answers);

Answers.propTypes = {
  answers: PropTypes.array,
  correctAnswer: PropTypes.array,
}.isRequired;
