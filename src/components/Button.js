import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { resetTime } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ resetTime }
      >
        Próxima
      </button>
    );
  }
}

Button.propTypes = {
  resetTime: PropTypes.func.isRequired,
};

export default Button;
