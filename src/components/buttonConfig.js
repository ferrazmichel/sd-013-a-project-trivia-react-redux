import React from 'react';
import { Button } from 'react-bootstrap';

class ButtonConfig extends React.Component {
  render() {
    return (
      <Button
        variant="secondary"
        type="button"
        data-testid="btn-settings"
      >
        Configurações
      </Button>
    );
  }
}

export default ButtonConfig;
