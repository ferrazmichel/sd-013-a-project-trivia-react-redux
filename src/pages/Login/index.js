import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from '../../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userEmail: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  checkUser() {
    const { userEmail, userName } = this.state;
    if (userEmail && userName) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.checkUser());
  }

  render() {
    const { userEmail, userName, disabled } = this.state;
    const { fetch } = this.props;
    return (
      <fieldset>
        <label htmlFor="name">
          Escreve o nome da pessoa jogadora
          <input
            name="userName"
            type="text"
            data-testid="input-player-name"
            id="name"
            value={ userName }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Escreve o email da pessoa jogadora
          <input
            name="userEmail"
            type="text"
            data-testid="input-gravatar-email"
            id="email"
            value={ userEmail }
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disabled }
              onClick={ () => fetch() }
            >
              Jogar
            </button>
          </Link>
        </label>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchData()),
});

export default connect(null, mapDispatchToProps)(Login);
