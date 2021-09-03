import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } alt="" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>);
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { email, name, score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Feedback);
