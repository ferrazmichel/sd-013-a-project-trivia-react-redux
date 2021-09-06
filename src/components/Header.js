import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { nickname, gravatarEmail } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          alt="Gravatar Email Img"
        />
        <h2 data-testid="header-player-name">{ nickname }</h2>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

const mapStateToProps = (stateStore) => ({
  gravatarEmail: stateStore.user.gravatarEmail,
  nickname: stateStore.user.nickname,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  nickname: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
