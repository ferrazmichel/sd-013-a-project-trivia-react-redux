import React from 'react';
import PropTypes from 'prop-types';

class ButtonPlayGame extends React.Component {
  render() {
    const { isDisabled, onClick } = this.props;

    return (
      <button
        data-testid="btn-play"
        type="button"
        disabled={ isDisabled }
        onClick={ onClick }
      >
        Jogar
      </button>
    );
  }
}

ButtonPlayGame.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonPlayGame;
