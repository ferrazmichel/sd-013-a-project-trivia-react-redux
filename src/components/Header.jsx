import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name, scoreStore } = this.props;
    return (
      <header>
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar-user"
        />
        <p data-testid="header-player-name">
          { `${name}` }
          {' '}
        </p>
        <p data-testid="header-score">{scoreStore}</p>
      </header>

    );
  }
}

const mapStateToProps = ({ users, game }) => ({
  name: users.name,
  gravatarEmail: users.gravatarEmail,
  scoreStore: game.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  scoreStore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
