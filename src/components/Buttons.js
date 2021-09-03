import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Buttons extends React.Component {
  render() {
    const { handleClick, validadeButton } = this.props;
    return (
      <div>
        <button
          disabled={ !validadeButton } // retorna false caso ambos os campos estejam preenchidos
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
        >
          <Link to="/settings">Confifigurações</Link>
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  validadeButton: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Buttons;
