import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scorelocalStorage } from '../services/localstage';
import '../pages/pagesCSS/header.css';

class Header extends Component {
  render() {
    const { nickname, gravatarEmail } = this.props;
    return (
      <header className="main-header">
        <img
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          className="profile-picture"
          alt="Gravatar Email Img"
        />
        <h2 data-testid="header-player-name" className="header-nickname">{ nickname }</h2>
        <h2 data-testid="header-score" className="header-score">{scorelocalStorage()}</h2>
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
