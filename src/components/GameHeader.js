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
    const { userEmail } = this.props;
    if (gravatarHash === '') {
      const hash = MD5(userEmail).toString();
      this.handleStateChange(hash);
    }
  }

  handleStateChange(newHashValue) {
    this.setState({
      gravatarHash: newHashValue,
    });
  }

  render() {
    const { state: { gravatarHash }, props: { userName, score } } = this;
    return (
      <header className="header-container">
        <div>
          <h3 data-testid="header-player-name">{userName}</h3>
        </div>
        <div>
          <img className="img-thumbnail" alt="user-gravatar" src={ `https://www.gravatar.com/avatar/${gravatarHash}` } data-testid="header-profile-picture" />
        </div>
        <div>
          <h3 data-testid="header-score">{score}</h3>
        </div>
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
  score: state.scoreReducer.score,
});

export default connect(mapStateToProps)(GameHeader);
