import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { nome, email, score } = this.props;
    const md5Email = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${md5Email}`;
    const answers = 3;
    const { assertions } = JSON.parse(localStorage.getItem('state'))
      .player;
    return (
      <div data-testid="feedback-text">
        <header className="header-container">
          <div className="header-profile">
            <img data-testid="header-profile-picture" src={ avatar } alt="Avatar" />
            <span data-testid="header-player-name">
              Jogador:
              { nome }
            </span>
          </div>
          <div className="header-score-container">
            <span>Pontos:</span>
            <span className="header-score" data-testid="header-score">
              {score}
            </span>
          </div>
        </header>
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {assertions < answers ? (
            <span>Podia ser melhor...</span>
          ) : (
            <span>Mandou bem!</span>
          )}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.nome,
  email: state.user.email,
  score: state.game.score,
});

Feedback.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
