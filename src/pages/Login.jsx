import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Sound from 'react-sound';

import { Input, Dropdown } from '../components';
import { fetchToken, addUser, resetScore } from '../redux/actions';

import logo from '../files/trivialogo.png';
import music from '../files/sounds/music-theme.mp3';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      enable: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playSubmit = this.playSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  async playSubmit(e) {
    e.preventDefault();
    const { getToken, history, handleSubmit, resetPlayer } = this.props;
    await getToken();
    const { valueToken } = this.props; // I had to call props here, because the async function
    localStorage.setItem('token', JSON.stringify(valueToken.token));
    const { name, email } = this.state;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));

    handleSubmit({ name, email });
    resetPlayer();
    history.push('/gameScreen');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => (
      this.setState((prevState) => (
        { enable: prevState.name !== '' && this.validateEmail() }))
    ));
  }

  validateEmail() {
    const { email } = this.state;
    const isValid = /^([\w.%+-]+)@([\w-]+.)+([\w]{2,})$/i.test(email);
    if (!isValid || email === '') {
      return false;
    }
    return true;
  }

  sound() {
    return (
      <Sound
        url={ music }
        volume={ 20 }
        playStatus={ Sound.status.PLAYING }
        onLoading={ this.handleSongLoading }
        onPlaying={ this.handleSongPlaying }
        onFinishedPlaying={ this.handleSongFinishedPlaying }
      />
    );
  }

  render() {
    const { name, email, enable } = this.state;
    const { history } = this.props;
    return (
      <section className="container-fluid">
        <br />
        { this.sound() }
        <div className="row col-md-5 shadow mx-auto mt-3 p-5 bg-white">
          <header className="col-md-7 mx-auto p-4">
            <img src={ logo } className="img-fluid" alt="logo" width="500" />
          </header>
          <div className="d-flex justify-content-end">
            <Dropdown />
          </div>
          <form action="submit">
            <Input
              label="Nome"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              name="name"
              id="user-name"
              placeholder="Silvinho PoucasBalas"
            />
            <Input
              label="Email"
              type="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              id="user-email"
              placeholder="fulano@email.com"
            />
            <hr className="mb-4" />
            <div className="row">
              <button
                disabled={ !enable }
                type="submit"
                onClick={ this.playSubmit }
                className="btn btn-start btn-lg btn-block"
              >
                Jogar
              </button>
            </div>
            <div className="row mt-1">
              <button
                className="trivia-btn btn btn-primary btn-lg btn-block "
                type="submit"
                onClick={ () => history.push('/configScreen') }
              >
                Configurações
              </button>
            </div>
          </form>
        </div>
        <br />
        <br />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  handleSubmit: (data) => dispatch(addUser(data)),
  resetPlayer: () => dispatch(resetScore()),
});

const mapStateToProps = (state) => ({
  valueToken: state.users.token,
});

Login.propTypes = {
  resetPlayer: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  valueToken: PropTypes.shape({
    response_code: PropTypes.number,
    response_message: PropTypes.string,
    token: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Login.defaultProps = {
  valueToken: { token: '' },
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
