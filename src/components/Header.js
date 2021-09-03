import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div>
        <img src="" alt="" data-testid="header-player-name" />
        <p data-testid="header-player-name">
          Nome:
          { name }
        </p>
      </div>

      // <div className="container-header">
      //   <p data-testid="email-field">
      //     Email:
      //     {gravatarEmail}
      //   </p>
      //   <div>
      //     <p data-testid="total-field">Despesa: 0 </p>
      //   </div>
      //   <div>
      //     <p data-testid="header-currency-field">BRL</p>
      //   </div>
      // </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.email, // Olhar o user.email
  name,
  score,
});

export default connect(mapStateToProps)(Header);
