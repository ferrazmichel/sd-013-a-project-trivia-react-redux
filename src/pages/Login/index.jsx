import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

import { getToken } from '../../redux/actions';
import style from './style.module.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const { dispatchLogin } = this.props;
    const { name, email } = this.state;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    event.preventDefault();
    await dispatchLogin(({ name, email, gravatar }));
    this.setState({ shouldRedirect: true });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, shouldRedirect } = this.state;
    return shouldRedirect
      ? <Redirect to="/game" />
      : (
        <main className={ style.main }>
          <form className={ style.form } onSubmit={ this.handleSubmit }>
            <input
              className={ style.input }
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Nome"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              className={ style.input }
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
            />
            <button
              className={ style.buttonPlay }
              type="submit"
              data-testid="btn-play"
              disabled={ name.length < 1 || email.length < 1 }
            >
              Jogar
            </button>

            <Link to="/settings">
              <button
                className={ style.buttonConfig }
                type="button"
                data-testid="btn-settings"
              >
                Configurações
              </button>
            </Link>
          </form>
        </main>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (userInfo) => dispatch(getToken(userInfo)),
});

Login.propTypes = {
  dispatchLogin: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
