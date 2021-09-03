import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { nome, email } = this.props;
    const md5Email = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${md5Email}`;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="Avatar" />
        <span data-testid="header-player-name">
          Jogador:
          { nome }
        </span>
        <span data-testid="header-score">
          Pontos: 0
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.nome,
  email: state.user.email,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
