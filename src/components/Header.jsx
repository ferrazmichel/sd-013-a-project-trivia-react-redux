import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ReactComponent as ReactLogo } from '../files/trybelogo.svg';

class Header extends Component {
  render() {
    const { gravatarEmail, name, scoreStore } = this.props;
    return (
      <nav className="trivia-navbar">
        <div className="test d-flex bd-highlight align-items-center">
          <div className="p-2 flex-grow-1 bd-highlight">
            <ReactLogo />
          </div>

          <div className="p-2 bd-highlight">
            <img
              className="rounded-circle border border-white d-flex
              align-items-center mb-2 mb-lg-0"
              src={ gravatarEmail }
              alt="avatar-user"
              width="70"
              height="70"
            />
          </div>
          <div className="p-2 bd-highlight">
            <h4 className="text-white ml-5">
              { name }
            </h4>
          </div>
          <div className="p-2 bd-highlight">
            <h3 className="text-white">
              { `Pontuação: ${scoreStore}`}
            </h3>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ users, game }) => ({
  name: users.name,
  gravatarEmail: users.gravatarEmail,
  scoreStore: game.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  scoreStore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
