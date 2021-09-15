import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './header.css';
// jnoafsdjfsadńko]npk

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.createGravatar = this.createGravatar.bind(this);
  }

  createGravatar(info) {
    const gravatar = md5(info.toString());
    return gravatar;
  }

  updateLocalStorage() {
    const { score } = this.props;
    const state = localStorage.getItem('state');
    let scoreString = state.split('score')[1];
    scoreString = score;
    const stateSplit = state.split('score')[0] + scoreString;
    localStorage.setItem('state', stateSplit);
  }

  render() {
    const { player } = JSON.parse(localStorage.state);
    const { score } = this.props;
    const picture = `https://www.gravatar.com/avatar/${this.createGravatar(player.gravatarEmail)}`;

    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="Avatar do Usuário"
        />
        <h3
          className="nick"
          data-testid="header-player-name"
        >
          { player.name }
        </h3>
        <p className="nick" data-testid="header-score">{`Score: ${score}`}</p>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.pontuador.score,
});

// const mapDispatchToProps = () => ({

// })

export default connect(mapStateToProps)(Header);
