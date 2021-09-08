import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nome: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    const { onSubmit, history } = this.props;
    onSubmit(this.state);
    history.push('/');
    console.log('enviou');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { nome, email } = this.state;
    const nameMin = 1;
    const nameAllowed = nome.length >= nameMin;
    const emailValid = () => (/\S+@\S+\.\S+/).test(email);
    return (
      <div>
        <fieldset className="login">
          <label htmlFor="input-gravatar-email">
            Email do Gravatar:
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="input-player-name">
            Nome do Jogador:
            <input
              data-testid="input-player-name"
              type="nome"
              name="nome"
              onChange={ this.handleChange }
              value={ nome }
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ !(emailValid() && nameAllowed) }
            className="button"
            type="submit"
            onClick={ () => this.onSubmitForm() }
          >
            Entrar
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => (
  { onSubmit: (payload) => dispatch(saveEmail(payload)) }
);

export default connect(null, mapDispatchToProps)(Login);
