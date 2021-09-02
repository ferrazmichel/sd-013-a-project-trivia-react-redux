import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, label, onChange, value, name, id, dataTestid } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ id }
          data-testid={ dataTestid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  dataTestid: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
  id: '',
  dataTestid: '',
};

export default Input;
