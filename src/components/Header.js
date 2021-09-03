import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, nickname } = this.props;
    const cryptoEmail = md5(email.trim()).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${cryptoEmail}` }
          alt="Gravatar Email Img"
        />
        <h2 data-testid="header-player-name">{ nickname }</h2>
        <h2 data-testid="header-score">0</h2>
      </div>
    );
  }
}

const mapStateToProps = (stateStore) => ({
  email: stateStore.user.email,
  nickname: stateStore.user.nickname,
});

Header.propTypes = {
  email: PropTypes.string,
  nickname: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
