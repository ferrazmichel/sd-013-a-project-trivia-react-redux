import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  }

  onSubmitForm() {
    const { dispatchSetLogin } = this.props;
    dispatchSetLogin(this.state);
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
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetLogin: (state) => dispatch(setLogin(state)),
});

export default connect(null, mapDispatchToProps)(Forms);
