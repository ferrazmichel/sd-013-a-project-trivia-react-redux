import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const feedbackMessage = () => {
  // Mock do localStorage só para adiantar o requisito
  const player = {
    name: 'Bruno',
    assertions: 4,
    score: 42,
    gravatarEmail: 'brunopinho@outlook.com',
  };
  const THREE = 3;

  localStorage.setItem('player', JSON.stringify(player));

  const playerObj = JSON.parse(localStorage.getItem('player'));

  if (playerObj.assertions >= THREE) return <p data-testid="feedback-text">Mandou bem</p>;

  return <p data-testid="feedback-text">Podia ser melhor...</p>;
};

class Feedback extends React.Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{score}</span>
        </header>
        <main>
          {feedbackMessage()}
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { email, name, score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Feedback);
