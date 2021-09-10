import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getGravatar } from '../services/Api';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleMenssage = this.handleMenssage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMenssage() {
    const { hits } = this.props;
    if (hits <= 2) {
      console.log(hits);
      return <p>Podia ser melhor...</p>;
    }
    return <p>Mandou bem!</p>;
  }

  handleClick() {
    const { player, email } = this.props;
    const imagem = getGravatar(email);
    const ls = JSON.parse(localStorage.getItem('ranking'));
    console.log(ls);
    if (ls === null) {
      localStorage.setItem('ranking', JSON.stringify([{
        picture: imagem,
        name: player.name,
        score: player.score,
      }]));
    } else {
      const lsBOOL = ls.find((obj) => obj.name === player.name);
      if (!lsBOOL) {
        ls.push({
          picture: imagem,
          name: player.name,
          score: player.score,
        });
        localStorage.setItem('ranking', JSON.stringify(ls));
      }
    }
  }

  render() {
    const { totalScore, hits } = this.props;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { this.handleMenssage() }
        </span>
        <span data-testid="feedback-total-score">
          { totalScore }
        </span>
        <span data-testid="feedback-total-question">
          { hits }
        </span>
        <Link to="/" type="button" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link
          to="/ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClick }
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hits: state.game.player.assertions,
  totalScore: state.game.player.score,
  player: state.game.player,
  email: state.user.email,
});

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
