import React from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleMenssage = this.handleMenssage.bind(this);
  }

  handleMenssage() {
    const { hits } = this.props;
    if (hits <= 2) {
      console.log(hits);
      return <p>Podia ser melhor...</p>;
    }
    return <p>Mandou bem!</p>;
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
        <Link to="/ranking" type="button" data-testid="btn-ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hits: state.game.player.assertions,
  totalScore: state.game.player.score,
});

Feedback.propTypes = {
  hits: propTypes.number.isRequired,
  totalScore: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
