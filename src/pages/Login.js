import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { FecthAPI } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      valid: false,
    };
    this.validLogin = this.validLogin.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.handleHash = this.handleHash.bind(this);
  }

  async requestToken() {
    const { getAPI } = this.props;
    const returnedPromise = await
    fetch('https://opentdb.com/api_token.php?command=request');
    const returnedJson = await returnedPromise.json();
    localStorage.setItem('token', returnedJson.token);
    this.handleHash();
    getAPI();
  }

  handleForm({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validLogin();
  }

  validLogin() {
    const { email, name } = this.state;
    const REGEX_EMAIL = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const REGEX_NAME = 1;
    const isValidEmail = email.match(REGEX_EMAIL) !== null;
    const isValidName = name.length >= REGEX_NAME;
    if (isValidEmail === true && isValidName === true) {
      this.setState({
        valid: true,
      });
    }
  }

  handleHash() {
    const { email } = this.state;
    const encryptado = md5(email).toString();
    localStorage.setItem('hash', encryptado);
  }

  render() {
    const { valid, name } = this.state;
    return (
      <div className="login-panel">
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleForm }
          />
        </label>
        <label htmlFor="password">
          Name:
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleForm }
          />
        </label>
        <Link to={ { pathname: '/game', state: { name } } }>
          {valid ? <input
            type="Button"
            onClick={ this.requestToken }
            value="Jogar"
            data-testid="btn-play"
          />
            : <input type="Button" value="Jogar" data-testid="btn-play" disabled />}
        </Link>
        <Link to="/settings">
          <input type="Button" defaultValue="Configuracao" data-testid="btn-settings" />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(FecthAPI()),
});

Login.propTypes = {
  getAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
