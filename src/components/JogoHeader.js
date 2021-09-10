import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAvatar } from '../utils/utils';
import './jogoHeader.css';

class JogoHeader extends React.Component {
  render() {
    const { score, email, name } = this.props;
    const gravatar = fetchAvatar(email);
    return (
      <header
        className="rounded px-3 py-2 mb-1 header"
      >
        <div className="d-flex align-items-center">
          <img
            className="me-3 rounded-circle avatar"
            src={ gravatar }
            alt={ `${name} Avatar` }
            data-testid="header-profile-picture"
          />
          <p
            className="m-0 text-uppercase fw-bold"
            data-testid="header-player-name"
          >
            { name }
          </p>
        </div>
        <p className="m-0 text-uppercase fw-bold">
          Pontos:
          { ' ' }
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

JogoHeader.propTypes = {
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.game.player.gravatarEmail,
  name: state.game.player.name,
});

export default connect(mapStateToProps)(JogoHeader);
