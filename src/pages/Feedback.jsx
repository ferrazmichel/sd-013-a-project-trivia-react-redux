import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedbackMSG from '../components/FeedbackMSG';

class Feedback extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div className="feedback-main">
        <FeedbackMSG score={ score } />
        <button type="button" data-testid="btn-play-again">
          <Link to="/ranking">Jogar Novamente 🗘</Link>
        </button>
        <button type="button" data-testid="btn-play-again">
          <Link to="/play">Jogar Novamente 🗘</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Feedback);
