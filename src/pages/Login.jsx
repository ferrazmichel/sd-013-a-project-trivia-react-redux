import React from 'react';
import { Link } from 'react-router-dom';
import Forms from '../components/Forms';
// import ConfigPage from './ConfigPage';

class Login extends React.Component {
  render() {
    return (
      <>
        <Forms />
        <Link to="/config">
          <button type="button" data-testid="btn-settings">Configuração</button>
        </Link>
      </>
    );
  }
}

export default Login;
