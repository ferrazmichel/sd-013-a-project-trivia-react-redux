import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    const { name, point } = this.props;
    return (
      <div className="header">
        <div className="header-logos">
          <img
            src="https://i.pinimg.com/originals/89/74/82/897482d89aa1a4b266a7ee8b0dbd8f8e.gif"
            alt="pixel art asas batendo"
            className="header-wings"
          />
          <span className="header-game-title">
            Trivia
          </span>
        </div>
        <div className="header-infos">
          <img
            data-testid="header-profile-picture"
            alt="img-profile"
            src={ `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}` }
            className="header-img"
          />
          <span
            data-testid="header-player-name"
            className="header-text"
          >
            {name}
          </span>
          <span
            className="header-text"
            data-testid="header-score"
          >
            {point}
          </span>
        </div>
        <div className="header-logos">
          <span className="header-game-title">
            Time!
          </span>
          <img
            src="https://i.pinimg.com/originals/81/d5/4a/81d54a65efdeba6a87f20229861da00e.gif"
            alt="pixel art asas batendo"
            className="header-wings"
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  answer: PropTypes.shape({
    answer: PropTypes.shape({}) }),
}.isRequired;

const mapStateToProps = ({ game, user }) => ({
  answers: game.answer,
  loading: game.isLoading,
  name: user.name,
  timer: game.timer,
  point: game.point,
});

export default connect(mapStateToProps, null)(Header);
