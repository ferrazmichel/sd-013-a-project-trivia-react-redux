import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import getToken from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      redirectNow: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { tryLogin } = this.props;
    const { name, email } = this.state;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    await tryLogin(({ name, email, gravatar }));
    this.setState({
      redirectNow: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email, redirectNow } = this.state;
    if (redirectNow) return <Redirect to="/game" />;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ name.length < 1 || email.length < 1 }
        >
          Jogar
        </button>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tryLogin: (userData) => dispatch(getToken(userData)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  tryLogin: PropTypes.func.isRequired,
};
