import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchAvatar, fetchToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(event) {
    event.preventDefault();
    const { history, dispatchfetchAvatar, dispatchfetchToken } = this.props;
    const { email, name } = this.state;
    const convertedEmail = md5(email).toString();
    // console.log(convertedEmail);
    // Disparamos a nossa action através da função importada
    // de actions.js, que apelidamos de dispatchSetValue
    dispatchfetchAvatar(convertedEmail, name);
    await dispatchfetchToken();
    const { token } = this.props;
    localStorage.setItem('token', token);
    history.push('/jogo');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, name } = this.state;
    const isDisabled = !email || !name;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            Nome do Jogador:
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          {/* Parte do disabled foi feita com ajuda a Aline Hoshino */}
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.onSubmitForm }
            data-testid="btn-play"
          >
            Jogar
          </button>
          <Link
            to="/configuracoes"
            data-testid="btn-settings"
          >
            Configurações
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchfetchAvatar: PropTypes.func.isRequired,
  dispatchfetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchfetchAvatar: (email, name) => dispatch(fetchAvatar(email, name)),
  dispatchfetchToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
