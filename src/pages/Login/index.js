import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData, registerUser } from '../../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  checkUser() {
    const { email, name } = this.state;
    if (email && name) {
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

  async handleClick() {
    const { fetch, registry, score } = this.props;
    const { email, name } = this.state;
    const player = {
      name,
      assertions: 0,
      score,
      gravatarEmail: email,
    };
    const state = {
      player,
    };
    localStorage.setItem('state', JSON.stringify(state));
    await fetch();
    registry({ name, email });
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div>
        <fieldset>
          <label htmlFor="name">
            Escreve o nome da pessoa jogadora
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Escreve o email da pessoa jogadora
            <input
              name="email"
              type="text"
              data-testid="input-gravatar-email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <Link to="/game">
              <button
                data-testid="btn-play"
                type="button"
                disabled={ disabled }
                onClick={ () => this.handleClick() }
              >
                Jogar
              </button>
            </Link>
          </label>
        </fieldset>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  fetch: PropTypes.func.isRequired,
  registry: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state,
  score: state.scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchData()),
  registry: (data) => dispatch(registerUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
