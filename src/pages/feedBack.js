import React from 'react';
import md5 from 'crypto-js/md5';
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
    this.setRanking = this.setRanking.bind(this);
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const { props: { user, emailUser, totalPoints } } = this;
    const info = {
      name: user,
      score: totalPoints,
      picture: `https://www.gravatar.com/avatar/${md5(emailUser).toString()}`,
    };
    const arrayInfo = [...ranking, info];
    localStorage.setItem('ranking', JSON.stringify(arrayInfo));
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
        <button
          type="button"
          data-testid="btn-ranking"
        >
          <Link to="/ranking">Ver Ranking</Link>
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
        >
          <Link to="/">Jogar Novamente</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalPoints: state.sendFeedback.feedBack.total,
  correctAnswer: state.sendFeedback.feedBack.assertions,
  emailUser: state.login.email,
  user: state.login.login,
});

Feedback.propTypes = {
  emailUser: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  totalPoints: PropTypes.number.isRequired,
  correctAnswer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
