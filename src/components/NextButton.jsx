import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          // onClick={ nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

export default NextButton;
