import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  handleClick(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/');
  }

  handleRanking(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/ranking');
  }

  render() {
    const { grav, nameUser } = this.props;
    const localJson = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = localJson;
    return (
      <header>
        tela feedback
        <img
          src={ grav }
          alt="imagem do gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          Nome:
          { nameUser }
        </p>
        <p data-testid="header-score">
          Score:
          { score }
        </p>
        <button type="submit" data-testid="btn-ranking" onClick={ this.handleRanking }>
          Ver Ranking
        </button>
        <button type="submit" data-testid="btn-play-again" onClick={ this.handleClick }>
          Jogar novamente
        </button>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  grav: state.player.gravatar,
  nameUser: state.player.playerName,
});

FeedBack.propTypes = {
  grav: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(FeedBack);
