import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { profilePic, name, score } = this.props;
    return (
      <div>
        <img src={ profilePic } alt="Profile" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profilePic: state.user.profile,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profilePic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
