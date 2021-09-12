import React from 'react';
import { Link } from 'react-router-dom';

class ConfigPage extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="settings-title">pagina de configuraçao</h1>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </>
    );
  }
}

export default ConfigPage;
