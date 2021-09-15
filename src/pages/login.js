import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import fetchTokenApi from './index';
import './login.css';
import Pato from '../componets/pato';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      email: '',
      validate: {
        validateNickname: false,
        validateEmail: false,
      },
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.nicknameValidation = this.nicknameValidation.bind(this);
  }

  componentDidMount() {
    fetchTokenApi();
  }

  handleChange({ target }) {
    const { value, name } = target;
    if (name === 'email') {
      this.emailValidation(value);
      return this.setState({ [name]: value });
    } if (name === 'nickname') {
      this.nicknameValidation(value);
      return this.setState({ [name]: value });
    }
  }

  emailValidation(value) {
    const { validate } = this.state;
    const EMAIL_VALIDATION = /\S+@\S+\.\S+/;
    if (EMAIL_VALIDATION.test(value)) {
      return this.setState({
        validate: {
          ...validate,
          validateEmail: true,
        },
      });
    }
    return this.setState({ validate: { ...validate, login: false } });
  }

  nicknameValidation(value) {
    const { validate } = this.state;
    const MIN_NICKNAME_LENGTH = 1;
    if (value.length >= MIN_NICKNAME_LENGTH) {
      return this.setState({
        validate: {
          ...validate,
          validateNickname: true,
        },
      });
    }
    return this.setState({ validate: { ...validate, validateNickname: false } });
  }

  handleClick() {
    const { nickname, email } = this.state;
    const players = {
      player: {
        name: nickname,
        assertions: '',
        score: '',
        gravatarEmail: email,
      },
    };
    const nomeBunitinho = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    console.log(nomeBunitinho);
    const ranking = {
      name: nickname,
      score: '',
      picture: nomeBunitinho,
    };
    this.setState({ shouldRedirect: true });
    localStorage.setItem('state', JSON.stringify(players));
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { nickname, email, validate, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/game" />;
    return (
      <body className="App">
        
        <form className="forms">
          <div className="flexLBL">
            <label className="label" htmlFor="name">
              Nickname:
              <input
                className="input"
                data-testid="input-player-name"
                id="name"
                name="nickname"
                type="text"
                placeholder="Nick"
                value={ nickname }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="flexLBL">
            <label className="label" htmlFor="email">
              Email:
              <input
                className="input"
                data-testid="input-gravatar-email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            className="button"
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play"
            disabled={ !validate.validateEmail || !validate.validateNickname }
          >
            Jogar
          </button>
          
          <Link to="/config" data-testid="btn-settings">
          <Pato />
            </Link>
        </form>
      </body>
    );
  }
}

LoginScreen.propTypes = {
  sendLoginInfo: PropTypes.func,
}.isRequired;

export default LoginScreen;
