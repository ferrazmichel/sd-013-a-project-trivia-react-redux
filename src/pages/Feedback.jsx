import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedbackMSG from '../components/FeedbackMSG';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <div className="feedback-main">
        <Header />
        <FeedbackMSG score={ score } />
        <button type="button" data-testid="btn-play-again">
          <Link to="/ranking">Ranking &#127942;</Link>
        </button>
        <button type="button" data-testid="btn-play-again">
          <Link to="/play">Jogar Novamente 🗘</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { score } }) => ({
  // name,
  score,
  // gravatarEmail,
});

Feedback.propTypes = {
  // name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Feedback);
