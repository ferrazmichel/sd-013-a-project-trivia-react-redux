import React from 'react';
import { string, func, oneOfType, number } from 'prop-types';

class Input extends React.Component {
  render() {
    const { testid, labelText, type, name, value, onChange } = this.props;
    return (
      <label htmlFor={ testid }>
        { labelText }
        <input
          data-testid={ testid }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  labelText: string,
  testid: string,
  type: string,
  nome: string,
  value: oneOfType([string, number]),
  onChange: func,
}.isRequired;

export default Input;
