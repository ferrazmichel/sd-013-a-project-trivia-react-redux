import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.fetchGravater = this.fetchGravater.bind(this);
    this.msgAcertos = this.msgAcertos.bind(this);
  }

  fetchGravater() {
    const { userEmail } = this.props;
    const LowCaseEmail = userEmail.toLowerCase().trim();
    const hashEmail = md5(LowCaseEmail).toString();
    return (<img
      data-testid="header-profile-picture"
      alt={ hashEmail }
      src={ `https://www.gravatar.com/avatar/${hashEmail}` }
    />);
  }

  msgAcertos() {
    const { acertos } = this.props;
    const tres = 3;
    if (acertos < tres) {
      return (<p>Podia ser melhor...</p>);
    }

    return (<p>Mandou bem!</p>);
  }

  render() {
    const { userPlayer, placar, acertos } = this.props;
    return (
      <div>
        <header data-testid="feedback-text">
          { this.fetchGravater() }
          <p data-testid="header-player-name">{ userPlayer }</p>
          <p data-testid="header-score">{ placar }</p>
          <span data-testid="feedback-total-question">{ acertos }</span>
          <span data-testid="feedback-total-score">{placar}</span>
          {this.msgAcertos()}
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

Feedback.propTypes = {
  acertos: PropTypes.number,
  placar: PropTypes.number,
  userEmail: PropTypes.shape({
    toLowerCase: PropTypes.func,
  }),
  userPlayer: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userPlayer: state.user.player,
  placar: state.trivia.score,
  acertos: state.trivia.assertions,
});

export default connect(mapStateToProps)(Feedback);
