import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { resetStore } from '../actions';
import './Feedback.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleButtRanking = this.handleButtRanking.bind(this);
  }

  handleFeedback() {
    const state = localStorage.getItem('state');
    const THREE = 3;
    if (JSON.parse(state).player.assertions < THREE) {
      return (
        <h1 data-testid="feedback-text" className="feedback-text">Podia ser melhor...</h1>
      );
    }
    if (JSON.parse(state).player.assertions >= THREE) {
      return (
        <h1 data-testid="feedback-text" className="feedback-text">Mandou bem!</h1>
      );
    }
  }

  handleRanking() {
    const state = localStorage.getItem('state');
    return (
      <>
        <h1
          className="feedback-score"
          data-testid="feedback-total-score"
        >
          {JSON.parse(state).player.score}
        </h1>
        <h1
          data-testid="feedback-total-question"
          className="feedback-score"
        >
          {JSON.parse(state).player.assertions}
        </h1>
      </>
    );
  }

  handlePlayAgain() {
    const { reset } = this.props;
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => reset() }
        >
          Jogar Novamente
        </button>
      </Link>
    );
  }

  handleButtRanking() {
    return (
      <Link to="/ranking">
        <button type="button" data-testid="btn-ranking">Ranking</button>
      </Link>
    );
  }

  render() {
    return (
      <>
        <Header />
        <div className="feedback-content">
          { this.handleFeedback() }
          { this.handleRanking() }
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Worthy_artistic_new_year_fireworks_.gif"
            alt="fireworks"
            className="fireworks"
          />
          { this.handlePlayAgain() }
          { this.handleButtRanking() }
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  reset: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetStore()),
});

export default connect(null, mapDispatchToProps)(Feedback);
