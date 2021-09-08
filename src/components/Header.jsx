import React from 'react';
import './Header.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { nome, email } = this.props;
    const transformedEmail = md5(email).toString();
    const imgAvatar = `https://www.gravatar.com/avatar/${transformedEmail}`;
    console.log(nome);
    return (
      <div className="header">
        <img src={ imgAvatar } alt="" />
        <span>
          jogador:
          { nome }
        </span>
        <span>
          Pontos:
          { score }
        </span>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => (
//   { onSubmit: (payload) => dispatch(saveEmail(payload)) }
// );

// export default connect(null, mapDispatchToProps)(Login);

const mapStateToProps = (state) => ({
  nome: state.userReducer.nome,
  email: state.userReducer.email,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
