import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonConfig extends Component {
  render() {
    return (
      <Link to="/settings" data-testid="btn-settings" className="ui-button btn-play">
        CONFIGURAÇÃO
      </Link>
    );
  }
}

export default ButtonConfig;
