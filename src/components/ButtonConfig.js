import React from 'react';
import { Link } from 'react-router-dom';

class ButtonConfig extends React.Component {
  render() {
    return (
      <Link
        to="/configurations"
        type="button"
        data-testid="btn-settings"
        title="Configurations"
        className="btn btn-secondary"
      >
        Configurações
        {' '}
        <i className="bi bi-sliders" />
      </Link>
    );
  }
}

export default ButtonConfig;
