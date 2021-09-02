import React from 'react';
import PropTypes from 'prop-types';

class InputLogin extends React.Component {
  render() {
    const { labelValue, dataTestId, onChange, value } = this.props;

    return (
      <label htmlFor={ dataTestId }>
        { labelValue }
        <input
          type="text"
          data-testid={ dataTestId }
          id={ dataTestId }
          onChange={ onChange }
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
  value: PropTypes.string.isRequired,
};

export default InputLogin;
