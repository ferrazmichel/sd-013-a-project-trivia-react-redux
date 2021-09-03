import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonPlayGame extends Component {
  render() {
    const { isDisabled } = this.props;

    return (
      <button
        data-testid="btn-play"
        type="button"
        disabled={ isDisabled }
      >
        Jogar
      </button>
    );
  }
}

ButtonPlayGame.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
};

export default ButtonPlayGame;
