import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, score, gravatar } = this.props;

    return (
      <header className="game-header">
        <div className="game-header-player-info">
          <img data-testid="header-profile-picture" src={ gravatar } alt="Gravatar Pic" />
          <span>
            Player:&nbsp;
            <span data-testid="header-player-name">{ userName }</span>
          </span>
        </div>
        <span>
          Score:&nbsp;
          <span data-testid="header-score">{ score }</span>
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userName: state.userReducer.name,
    score: state.gameReducer.score,
    gravatar: state.userReducer.gravatar,
  }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
};
