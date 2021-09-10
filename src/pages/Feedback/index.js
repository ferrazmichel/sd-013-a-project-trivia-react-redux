import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: '0',
    };
    this.fetchAssertions = this.fetchAssertions.bind(this);
    this.setAssertions = this.setAssertions.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
  }

  componentDidMount() {
    const entireLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = entireLocalStorage;
    this.setAssertions(assertions);
  }

  setAssertions(assertions) {
    this.setState({ assertions });
  }

  fetchAssertions() {
    const { assertions } = this.state;
    let feedbackMessage = '';
    const avaliator = 3;
    if (assertions < avaliator) {
      feedbackMessage = 'Podia ser melhor...';
    } else {
      feedbackMessage = 'Mandou bem!';
    }
    return feedbackMessage;
  }

  handleClick() {
    const { resetGame } = this.props;
    resetGame();
    this.updateRanking();
  }

  updateRanking() {
    const currentState = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail } } = currentState;
    const hash = MD5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const currentPlayerRanking = {
      name,
      score,
      picture,
    };
    const currentRanking = JSON.parse(localStorage.getItem('ranking'));
    if (currentRanking === null) {
      localStorage.setItem('ranking', JSON.stringify(currentPlayerRanking));
    } else {
      const newRanking = {
        currentRanking,
        ...currentPlayerRanking,
      };
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  render() {
    const { userName, score } = this.props;
    console.log(userName);
    const { assertions } = this.state;
    const feedbackMessage = this.fetchAssertions();
    const state = JSON.parse(localStorage.getItem('state'));
    const userEmail = state.player.gravatarEmail;
    const hash = MD5(userEmail).toString();
    return (
      <div className="feedback-container">
        <header>
          <img className="img-thumbnail" src={ `https://www.gravatar.com/avatar/${hash}` } data-testid="header-profile-picture" alt="header-profile" />
          <h3 data-testid="header-player-name">{ userName }</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <div data-testid="feedback-text">
          { feedbackMessage }
        </div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <Link to="/">
          <button
            onClick={ () => this.handleClick() }
            className="btn btn-info"
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            onClick={ () => this.handleClick() }
            className="btn btn-info"
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer, scoreReducer }) => ({
  userName: loginReducer.name,
  score: scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch({ type: 'RESET_GAME' }),
});
FeedBack.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
