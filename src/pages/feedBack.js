import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      forcaRespondido: true,
    };
  }

  render() {
    const { totalPoints, correctAnswer } = this.props;
    const { forcaRespondido } = this.state;
    const ruim = 3;
    const resultadoBaixo = 'Podia ser melhor...';
    const resultadoBom = 'Mandou bem!';
    return (
      <div>
        <Header
          score={ totalPoints }
          respondido={ forcaRespondido }
        />
        <h2 data-testid="feedback-total-question">
          {correctAnswer || 0 }
        </h2>
        <h3 data-testid="feedback-total-score">{totalPoints}</h3>
        <h3 data-testid="feedback-text">
          {correctAnswer < ruim ? resultadoBaixo : resultadoBom }
        </h3>
        <button type="button" data-testid="btn-play-again">
          <Link to="/">Jogar Novamente</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalPoints: state.sendFeedback.feedBack.total,
  correctAnswer: state.sendFeedback.feedBack.assertions,
});

Feedback.propTypes = {
  totalPoints: PropTypes.number.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
