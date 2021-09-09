import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getScore() {
    const { score } = JSON.parse(localStorage.getItem('state')).player;
    return { score };
  }

  render() {
    const { name, email } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="profile" />
        <span data-testid="header-player-name">{`Jogador: ${name}`}</span>
        <span data-testid="header-score">
          {`Placar: ${this.getScore()}`}
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  name: login.name,
  email: login.email,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);

