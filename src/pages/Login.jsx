import React from 'react';
import { Link } from 'react-router-dom';
import Forms from '../components/Forms';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <>
        <Forms />
        <Link to="/config">
          <button
            className="button-config"
            type="button"
            data-testid="btn-settings"
          >
            Configuração
          </button>
        </Link>
      </>
    );
  }
}

export default Login;
