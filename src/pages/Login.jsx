import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchActions from '../redux/actions/fetchActions';

import {
  validateLoginFactory,
  savePlayerDataOnLocalStorage,
  // fetchTokenApi,
} from './pageFunctions/loginFuncs';
import logo from '../trivia.png';
import Input from '../components/Input';
import Button from '../components/Button';

// const random = 'random';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disable: true,
      email: '',
      name: '',
      score: '',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disableAndAbleButton = this.disableAndAbleButton.bind(this);
    this.verifyUserLogin = this.verifyUserLogin.bind(this);
  }

  disableAndAbleButton(boolean) {
    return (
      !boolean ? this.setState({ disable: false }) : this.setState({ disable: true })
    );
  }

  verifyUserLogin() {
    const { name, email } = this.state;
    const shoudRedirectBollean = !validateLoginFactory(email, name);
    this.disableAndAbleButton(shoudRedirectBollean);
  }

  saveUserLoginOnState(name, value) {
    this.setState({
      [name]: value,
    });
  }

  async handleChange({ target: { name, value } }) {
    await this.saveUserLoginOnState(name, value);
    this.verifyUserLogin();
  }

  handleClick() {
    const { fetchToken } = this.props;
    fetchToken();
    savePlayerDataOnLocalStorage(this.state);
    this.setState({ redirect: true });
  }

  render() {
    const { username, email, disable, redirect } = this.state;
    if (redirect) return <Redirect to="/game" />;

    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />

        <form>
          <Input
            type="text"
            name="name"
            id="player-name"
            labelText="Usuário: "
            testID="input-player-name"
            onChange={ this.handleChange }
            value={ username }
          />
          <Input
            type="email"
            name="email"
            id="player-email"
            labelText="E-mail: "
            testID="input-gravatar-email"
            onChange={ this.handleChange }
            value={ email }
          />
          <Button
            id="login-submit"
            testID="btn-play"
            text="Jogar"
            disabled={ disable }
            onClick={ this.handleClick }
          />
          <Link to="/settings" data-testid="btn-settings">
            Configurações
          </Link>
        </form>
      </header>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchActions()),
});

export default connect(null, mapDispatchToProps)(Login);
