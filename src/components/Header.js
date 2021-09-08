import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAvatar from '../fetchAvatar';

class Header extends React.Component {
  render() {
    const { gravatarEmail, score, name } = this.props;
    const avatar = fetchAvatar(gravatarEmail);

    return (
      <header>
        <div>
          <div>
            <img src={ avatar } alt="avatar" data-testid="header-profile-picture" />
          </div>
          <div>
            <p data-testid="header-player-name">
              Nome:
              { name }
            </p>
            <p data-testid="header-score">
              { score }
            </p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
