import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { setLogin, setQuestions } from '../Actions';

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.apiFetch = this.apiFetch.bind(this);
    this.apiFetchTrivia = this.apiFetchTrivia.bind(this);
  }

  async onSubmitForm() {
    const { dispatchSetLogin, history } = this.props;
    dispatchSetLogin(this.state);
    await this.apiFetch();
    await this.apiFetchTrivia();
    history.push('/jogo');
  }

  async apiFetchTrivia() {
    const { dispatchSetQuestions } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    const { results } = json;
    dispatchSetQuestions(results);
  }

  async apiFetch() {
    const Api = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await Api.json();
    localStorage.setItem('token', json.token);
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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.validEmail(email, nome) }
          onClick={ this.onSubmitForm }
        >
          Jogar
        </button>

      </form>
    );
  }
}

Forms.propTypes = {
  dispatchSetLogin: PropTypes.func.isRequired,
  dispatchSetQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetLogin: (state) => dispatch(setLogin(state)),
  dispatchSetQuestions: (state) => dispatch(setQuestions(state)),
});

export default connect(null, mapDispatchToProps)(withRouter(Forms));
