import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    };
  }

  render() {
    const { props: { dataTestId, name, func }, state: { disabled } } = this;

    return (
      <button
        data-testid={ dataTestId }
        func={ func }
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
  func: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Button;
