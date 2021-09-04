import React from 'react';
import { Link } from 'react-router-dom';

class ButtonConfig extends React.Component {
  render() {
    return (
      <Link to="/configurations">
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </Link>
    );
  }
}

export default ButtonConfig;
