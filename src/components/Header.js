import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { nome, picture, score } = this.props;
    const imagem = JSON.parse(localStorage.getItem('ranking'));
    return (
      <header>
        <img
          src={ picture || imagem[0].picture }
          alt="Imagem do usuario"
          data-testid="header-profile-picture"
        />
        <br />
        Nome:
        <span data-testid="header-player-name">{nome}</span>
        <br />
        Placar:
        <span data-testid="header-score">{score}</span>
        <br />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.name,
  picture: state.user.picture,
  score: state.user.score,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
