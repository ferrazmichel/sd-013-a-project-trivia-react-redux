import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getToken } from '../redux/actions';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSumit = this.handleSumit.bind(this);
  }

  handleSumit(event) {
  const { dispatchLogin } = this.props;
  const { name, email } = this.state;
  event.preventDefault();
  dispatchLogin(({name, email}));
  this.setState({
    shouldRedirect: true,
  })
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, shouldRedirect } = this.state;
    if(shouldRedirect) return <Redirect to="/game" />
       
    return (
      <form onSubmit={ this.handleSumit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ name.length < 1 || email.length < 1 }
        >
          Jogar
        </button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
dispatchLogin: (userInfo) => dispatch(getToken(userInfo))
 });

export default connect(null, mapDispatchToProps)(Login);

// Login.propTypes = {

// };
