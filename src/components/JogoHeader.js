import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAvatar } from '../utils/utils';

class JogoHeader extends React.Component {
  render() {
    const { email, name, score } = this.props;
    const gravatar = fetchAvatar(email);
    return (
      <header>
        <div>
          <img
            src={ gravatar }
            alt={ `${name} Avatar` }
            data-testid="header-profile-picture"
          />
        </div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

JogoHeader.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.game.player.gravatarEmail,
  name: state.game.player.name,
});

export default connect(mapStateToProps)(JogoHeader);
