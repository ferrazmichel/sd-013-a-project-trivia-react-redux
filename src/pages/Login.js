import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    this.setEmailAndName = this.setEmailAndName.bind(this);
  }

  componentDidMount() {
    this.setEmailAndName();
  }

  setEmailAndName() {
    const { name, email } = this.props;
    this.setState({
      email,
      name,
    });
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
    const { history, dispatchValidLogin } = this.props;
    const { email, name } = this.state;
    // await dispatchfetchToken();
    // localStorage.setItem('token', token);
    dispatchValidLogin(name, email);
    history.push('/configuracoes');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
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
    );
  }

  renderNameInput() {
    const { name } = this.state;
    return (
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
    );
  }

  renderForm() {
    const { email, name } = this.state;
    const isDisabled = !email || !name;
    return (
      <form className="d-flex flex-column justify-content-center rounded form">
        <h3 className="mb-5 text-white fw-bold">TRIVIA GAME</h3>
        { this.renderEmailInput() }
        { this.renderNameInput() }
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
          className="text-uppercase btn btn-config fw-bold mb-5"
          type="submit"
          onClick={ this.handleClickConfig }
          data-testid="btn-settings"
        >
          Configurações
        </button>
        <Link
          className="devs
          d-flex btn justify-content-center align-items-center"
          to="/devs"
        >
          <span className="header-devs text-uppercase fw-bold">Devs</span>
        </Link>
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
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
  email: state.game.player.gravatarEmail,
  name: state.game.player.name,
  token: state.game.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
