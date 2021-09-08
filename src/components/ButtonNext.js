import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css';

class ButtonNext extends Component {
  render() {
    const { classBtn, handleId } = this.props;
    return (
      <div>
        <button
          type="submit"
          data-testid="btn-next"
          className={ classBtn }
          onClick={ handleId }
        >
          Próxima
        </button>
      </div>
    );
  }
}

ButtonNext.propTypes = {
  classBtn: PropTypes.string.isRequired,
  handleId: PropTypes.func.isRequired,
};

export default ButtonNext;
