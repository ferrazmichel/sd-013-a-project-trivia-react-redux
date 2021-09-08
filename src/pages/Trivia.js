import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchApiQuestions } from '../redux/actions';
// import md5 from 'crypto-js/md5';

class Trivia extends Component {
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
=======
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.fetchGravater = this.fetchGravater.bind(this);
  }

  componentDidMount() {
    this.fetchGravater();
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
    const { userPlayer } = this.props;
    return (
      <header>
        { this.fetchGravater() }
        <p data-testid="header-player-name">{userPlayer}</p>
        <p data-testid="header-score">Placar: 0</p>

      </header>
    );
  }
}

Trivia.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.trivia.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApiQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
=======
  userEmail: PropTypes.shape({
    toLowerCase: PropTypes.func,
  }).isRequired,
  userPlayer: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userPlayer: state.user.player,
});

export default connect(mapStateToProps, null)(Trivia);
