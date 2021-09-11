import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name, scoreStore } = this.props;
    return (
      <header className="row text-white p-3 mt-2 col-md-8 mx-auto bg-danger">
        <div className="container">
          <div
            className="d-flex flex-wrap align-items-center
          justify-content-center justify-content-lg-start"
          >
            <img
              className="rounded-circle border border-white d-flex
              align-items-center mb-2 mb-lg-0"
              src={ gravatarEmail }
              alt="avatar-user"
              width="70"
              height="70"
            />
            <div
              className="nav col-12 col-lg-auto me-lg-auto
            mb-2 justify-content-center mb-md-0"
            >

              <h4 className="px-2">
                { name }
              </h4>

            </div>
            <div className="row text-end">
              <h3 className="align-items-center">
                { `Pontuação: ${scoreStore}`}
              </h3>
            </div>

          </div>
        </div>
      </header>
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
