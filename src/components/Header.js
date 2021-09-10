import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, point } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="img-profile"
          src={ `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}` }
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{point}</span>
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
  name: user.name,
  timer: game.timer,
  point: game.point,
});

export default connect(mapStateToProps, null)(Header);
