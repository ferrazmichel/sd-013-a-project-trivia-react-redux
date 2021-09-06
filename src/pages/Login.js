import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogin } from '../redux/actions';
import { getToken, getGravatar } from '../services/Api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: true,
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this.enableButton();
  }

  enableButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async fetchToken() {
    const { email } = this.state;
    const result = await getToken();
    const imagem = getGravatar(email);
    console.log(imagem);
    localStorage.setItem('token', result.token);
    localStorage.setItem('ranking', JSON.stringify([{ picture: imagem }]));
  }

  handleOnClick() {
    const { email } = this.state;
    const imagem = getGravatar(email);
    const { setLogin } = this.props;
    this.fetchToken();
    setLogin({ ...this.state, picture: imagem });
  }

  render() {
    const { email, name, disabledButton } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
            onClick={ this.handleOnClick }
          >
            Jogar
          </button>
        </Link>
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
  setLogin: (payload) => dispatch(getLogin(payload)),
});

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
