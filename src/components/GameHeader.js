import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class GameHeader extends Component {
  constructor() {
    super();

    this.state = {
      gravatarHash: '',
    };
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    const { gravatarHash } = this.state;
    const { userEmail, userName } = this.props;
    if (gravatarHash === '') {
      const hash = MD5(userEmail).toString();
      this.handleStateChange(hash);
    }
    console.log(userEmail, userName);
  }

  handleStateChange(newHashValue) {
    this.setState({
      gravatarHash: newHashValue,
    });
  }

  render() {
    const { state: { gravatarHash }, props: { userName, score } } = this;
    return (
      <header>
        <img alt="user-gravatar" src={ `https://www.gravatar.com/avatar/${gravatarHash}` } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{userName}</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

GameHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.loginReducer.email,
  userName: state.loginReducer.name,
  score: state.userReducer.score,
});

export default connect(mapStateToProps)(GameHeader);
