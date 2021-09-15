import React from 'react';
import { Link } from 'react-router-dom';
import './ConfigPage.css';

class ConfigPage extends React.Component {
  render() {
    return (
      <>
        <h1 className="title" data-testid="settings-title">pagina de configuraçao</h1>
        <Link to="/">
          <button className="btn-config" type="button">Voltar</button>
        </Link>
      </>
    );
  }
}

export default ConfigPage;
