import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { getToken } from '../../redux/actions';
import style from './Login.module.css';
import logo from '../../assets/Trivia.png';

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
    event.preventDefault();
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    await dispatchLogin(({ name, email, gravatar }));
    this.setState({
      shouldRedirect: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  renderForm() {
    const { name, email } = this.state;
    return (
      <form className={ style.form } onSubmit={ this.handleSubmit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          className={ style.input }
          placeholder="Digite seu nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail com gravatar"
          value={ email }
          className={ style.input }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          title="Clique aqui para jogar"
          className={ style.play }
          data-testid="btn-play"
          disabled={ name.length < 1 || email.length < 1 }
        >
          Jogar
        </button>

        <Link to="/settings">
          <button
            className={ style.settings }
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <main className={ style.main }>
        <article>
          {this.renderForm()}
        </article>
        <article>
          <img src={ logo } alt="Logo" />
        </article>
      </main>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (userInfo) => dispatch(getToken(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};
