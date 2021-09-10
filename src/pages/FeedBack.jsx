import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.returnMessageFeedBack = this.returnMessageFeedBack.bind(this);
    this.returnPlacarFinalQuestions = this.returnPlacarFinalQuestions.bind(this);
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

  returnMessageFeedBack(assertions) {
    const tres = 3;
    switch (assertions) {
    case assertions < tres:
      return 'Podia ser melhor...';
    case assertions >= tres:
      return 'Mandou bem!';
    default:
      return 'Podia ser melhor...';
    }
  }

  returnPlacarFinalQuestions(assertions) {
    if (assertions === 0) {
      return 'Não acertou nenhuma pergunta';
    }
    return `Acertou ${assertions} perguntas`;
  }

  render() {
    const { grav, nameUser } = this.props;
    const localJson = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localJson;
    return (
      <div>
        <header>
          tela feedback
          <img
            src={ grav }
            alt="imatgem do gravatar"
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
        <p data-testid="feedback-text">
          { this.returnMessageFeedBack(assertions)}
        </p>
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <p data-testid="feedback-total-question">
          { this.returnPlacarFinalQuestions(assertions)}
        </p>
      </div>
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
