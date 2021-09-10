import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import logo from '../trivia.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const src = `https://www.gravatar.com/avatar/${MD5(email)}`;
    return (
      <header className="header">
        <img src={ logo } alt="Logo" />
        <div className="header-infos">
          <img src={ src } alt="Profile" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{`Player: ${name}`}</span>
          <p>
            {'Score: '}
            <span data-testid="header-score">
              {score}
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
