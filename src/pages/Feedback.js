import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedbackMSG from '../components/FeedbackMSG';
import Header from '../components/Header';
import { saveToLocalStorage, loadFromLocalStorage, insertAtRank } from '../services';
import { sendRankingInfo } from '../actions';

class Feedback extends React.Component {
  componentWillUnmount() {
    const { gravatarEmail, name, score, sendRankToStore } = this.props;
    const ranking = loadFromLocalStorage('ranking');
    const currPlayer = { gravatarEmail, name, score };
    insertAtRank(ranking, currPlayer);
    saveToLocalStorage('ranking', ranking);
    sendRankToStore({ ranking });
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-main">
        <Header />
        <FeedbackMSG score={ score } assertions={ assertions } />
        <button type="button" data-testid="btn-ranking">
          <Link to="/ranking">Ranking &#127942;</Link>
        </button>
        <button type="button" data-testid="btn-play-again">
          <Link to="/">Jogar Novamente 🗘</Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendRankToStore: (payload) => dispatch(sendRankingInfo(payload)),
});

const mapStateToProps = ({ play: { player } }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
  assertions: player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  sendRankToStore: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
