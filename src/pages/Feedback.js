import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.fetchGravater = this.fetchGravater.bind(this);
  }

  fetchGravater() {
    const { userEmail } = this.props;
    const LowCaseEmail = userEmail.toLowerCase().trim();
    const hashEmail = md5(LowCaseEmail).toString();
    return (<img
      data-testid="header-profile-picture"
      alt={ hashEmail }
      src={ `https://www.gravatar.com/avatar/${hashEmail}` }
    />);
  }

  render() {
    const { userPlayer, placar, acertos } = this.props;
    return (
      <div>
        <header data-testid="feedback-text">
          { this.fetchGravater() }
          <p data-testid="header-player-name">{ userPlayer }</p>
          <p data-testid="header-score">{ placar }</p>
          <p data-testid="header-assertions">{ acertos }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userPlayer: state.user.player,
  placar: state.trivia.score,
  acertos: state.trivia.assertions,
});

export default connect(mapStateToProps)(Feedback);
