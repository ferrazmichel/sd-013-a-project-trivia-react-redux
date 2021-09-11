import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, label, onChange, value, name, id, placeholder } = this.props;
    return (
      <div className="mb-3 row">
        <label htmlFor={ name }>
          { label }
          <input
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            id={ id }
            placeholder={ placeholder }
            className="form-control"
          />
        </label>
      </div>
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
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
  id: '',
  placeholder: '',
};

export default Input;
