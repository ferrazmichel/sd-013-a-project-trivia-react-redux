import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
    };
  }

  render() {
    const { props: { dataTestId, name, onClick }, state: { disabled } } = this;

    return (
      <button
        data-testid={ dataTestId }
        onClick={ onClick }
        type="button"
        disabled={ disabled }
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
}.isRequired;

export default Button;
