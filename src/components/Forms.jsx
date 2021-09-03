import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setLogin } from '../Actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.tokenRecebido = this.tokenRecebido.bind(this);
  }

  onSubmitForm() {
    const { dispatchSetLogin } = this.props;
    dispatchSetLogin(this.state);
    this.apiFetch();
  }

  async apiFetch() {
    const Api = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await Api.json();
    localStorage.setItem('token', JSON.stringify(json.token));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validEmail(email, nome) {
    const valid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!valid || nome.length === 0) {
      return true;
    }
    return false;
  }

  render() {
    const { nome, email } = this.state;
    return (
      <form action="">
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="nome"
            value={ nome }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/jogo">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validEmail(email, nome) }
            onClick={ this.onSubmitForm }
          >
            Jogar
          </button>
        </Link>

      </form>
    );
  }
}

Forms.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  dispatchSetLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetLogin: (state) => dispatch(setLogin(state)),
});

export default connect(null, mapDispatchToProps)(Forms);
