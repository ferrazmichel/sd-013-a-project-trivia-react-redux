import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTokenThunk, getLogin, setPlayer } from '../redux/actions';
import { getGravatar } from '../services/Api';

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
    this.tokenThunk = this.tokenThunk.bind(this);
  }

  componentDidMount() {
    this.tokenThunk();
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

  fetchToken() {
    const { email } = this.state;
    const { token } = this.props;
    const imagem = getGravatar(email);
    localStorage.setItem('token', token);
    localStorage.setItem('ranking', JSON.stringify([{
      picture: imagem,
      name: '',
      score: '',
    }]));
  }

  async tokenThunk() {
    const { setTokenThunk, token } = this.props;
    await setTokenThunk();
    localStorage.setItem('token', token);
  }

  handleOnClick() {
    const { email, name } = this.state;
    const imagem = getGravatar(email);
    const { setLogin, setPlayerGame } = this.props;
    this.fetchToken();
    setLogin({ ...this.state, picture: imagem });
    setPlayerGame({ name, gravatarEmail: email });
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
  setPlayerGame: (payload) => dispatch(setPlayer(payload)),
  setTokenThunk: () => dispatch(fetchTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
});

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
  setTokenThunk: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setPlayerGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
