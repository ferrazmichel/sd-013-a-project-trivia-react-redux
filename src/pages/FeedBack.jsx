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

  handleClick() {
    const { history } = this.props;
    // e.preventDefault();
    history.push('/');
  }

  handleRanking() {
    const { history } = this.props;
    // e.preventDefault();
    history.push('/ranking');
  }

  returnMessageFeedBack() {
    const localJson = JSON.parse(localStorage.getItem('state')).player;
    const { assertions } = localJson;
    const tres = 3;
    if (assertions < tres) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  returnPlacarFinalQuestions() {
    const localJson = JSON.parse(localStorage.getItem('state')).player;
    const { assertions } = localJson;
    if (assertions === 0) {
      return 0;
    }
    return assertions;
  }

  render() {
    const { grav, nameUser } = this.props;
    const localJson = JSON.parse(localStorage.getItem('state')).player;
    const { score } = localJson;
    console.log(typeof score);
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
            { score }
          </p>
          <button
            type="submit"
            data-testid="btn-ranking"
            onClick={ () => this.handleRanking() }
          >
            Ver Ranking
          </button>
          <button
            type="submit"
            data-testid="btn-play-again"
            onClick={ () => this.handleClick() }
          >
            Jogar novamente
          </button>
        </header>
        <p data-testid="feedback-text">
          { this.returnMessageFeedBack()}
        </p>
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <p data-testid="feedback-total-question">
          { this.returnPlacarFinalQuestions()}
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
