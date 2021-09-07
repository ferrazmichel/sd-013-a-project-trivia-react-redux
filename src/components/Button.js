import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { dataTestId, name, onClick, disabled } = this.props;

    return (
      <button
        type="button"
        data-testid={ dataTestId }
        disabled={ disabled }
        onClick={ onClick }
      >
        { name }
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}.isRequired;

export default Button;
