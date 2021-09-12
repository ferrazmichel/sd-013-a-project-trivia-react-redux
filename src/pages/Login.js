import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveUserInfo } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  fetchAPI() {
    const { history } = this.props;
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        history.push('/game');
      });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.fetchAPI();
    const { saveUser } = this.props;
    saveUser(this.state);
  }

  checkInputs() {
    const { email, name } = this.state;
    const REG_EX_EMAIL = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/;
    return !REG_EX_EMAIL.test(email) || name.length === 0;
  }

  render() {
    const { name, email } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="form">
        <label htmlFor="name">
          Name:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            placeholder="Coloque seu nome"
            value={ name }
            onChange={ this.handleChange }
            className="name-email"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="email"
            placeholder="Coloque seu e-mail"
            value={ email }
            onChange={ this.handleChange }
            className="name-email"
          />
        </label>

        <button
          data-testid="btn-play"
          type="submit"
          className="button-main"
          disabled={ this.checkInputs() }
        >
          Jogar
        </button>
        <Link to="/configs">
          <button
            data-testid="btn-settings"
            type="button"
            className="button-main"
          >
            Configurações
          </button>
        </Link>
      </form>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(saveUserInfo(payload)),
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
