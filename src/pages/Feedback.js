import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedbackMessage from '../components/FeedbackMessage';

// Mock do localStorage só para adiantar o requisito
const player = {
  name: 'Bruno',
  assertions: 2,
  score: 42,
  gravatarEmail: 'brunopinho@outlook.com',
};
localStorage.setItem('player', JSON.stringify(player));
const mockedLocalStorage = JSON.parse(localStorage.getItem('player'));

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
          <FeedbackMessage player={ mockedLocalStorage } />
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
