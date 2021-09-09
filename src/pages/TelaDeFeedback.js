import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class TelaDeFeedback extends Component {
  constructor() {
    super();

    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.goToHome }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

TelaDeFeedback.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default TelaDeFeedback;
