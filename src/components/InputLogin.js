import React from 'react';
import PropTypes from 'prop-types';

class InputLogin extends React.Component {
  render() {
    const { labelValue, dataTestId, onChange, name, value } = this.props;

    return (
      <label htmlFor={ dataTestId }>
        { labelValue }
        <input
          type="text"
          data-testid={ dataTestId }
          id={ dataTestId }
          onChange={ onChange }
          name={ name }
          value={ value }
        />
      </label>
    );
  }
}

InputLogin.propTypes = {
  labelValue: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputLogin;
