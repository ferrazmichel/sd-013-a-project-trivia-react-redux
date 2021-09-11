import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validLogin, fetchToken } from '../redux/actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
  }

  async handleClickPlay(event) {
    event.preventDefault();
    const { history, dispatchValidLogin, dispatchfetchToken, token } = this.props;
    const { email, name } = this.state;
    await dispatchfetchToken();
    localStorage.setItem('token', token);
    dispatchValidLogin(name, email);
    history.push('/jogo');
  }

  async handleClickConfig(event) {
    event.preventDefault();
    const { history, dispatchValidLogin, dispatchfetchToken, token } = this.props;
    const { email, name } = this.state;
    await dispatchfetchToken();
    localStorage.setItem('token', token);
    dispatchValidLogin(name, email);
    history.push('/configuracoes');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderForm() {
    const { email, name } = this.state;
    const isDisabled = !email || !name;
    return (
      <form className="d-flex flex-column justify-content-center rounded form">
        <h3 className="mb-5 text-white fw-bold">TRIVIA GAME</h3>
        <label className="form-label text-start mb-3 text-white fw-bold" htmlFor="email">
          Email do Gravatar
          <input
            className="form-control input removeMargin"
            type="email"
            name="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <label className="form-label text-start mb-3 text-white fw-bold" htmlFor="name">
          Nome do Jogador
          <input
            className="form-control input"
            type="text"
            name="name"
            id="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          className="text-uppercase btn btn-play fw-bold mb-3"
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClickPlay }
          data-testid="btn-play"
        >
          Vamos Jogar!
        </button>
        <button
          className="text-uppercase btn btn-config fw-bold"
          type="submit"
          onClick={ this.handleClickConfig }
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="text-center">
        { this.renderForm() }
      </div>
    );
  }
}

Login.propTypes = {
  dispatchValidLogin: PropTypes.func.isRequired,
  dispatchfetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchValidLogin: (name, email) => dispatch(validLogin(name, email)),
  dispatchfetchToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
