import React from 'react';
import PropTypes from 'prop-types';

class Option extends React.Component {
  render() {
    const { name, value, text } = this.props;

    return (
      <option name={ name } value={ value }>{ text }</option>
    );
  }
}
Option.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Option;
