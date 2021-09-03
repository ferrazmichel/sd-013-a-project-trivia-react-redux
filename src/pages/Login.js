import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  handleSubmit(e) {
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
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Name:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

          <button
            data-testid="btn-play"
            type="submit"
            disabled={ this.checkInputs() }
          >
            Jogar
          </button>
        <Link to="/configs">
          <button
            data-testid="btn-settings"
            type="button"
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
})

export default connect(null, mapDispatchToProps)(Login);
