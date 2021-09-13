import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { returnInitialState } from '../redux/actions';

class PlayAgainButton extends Component {
  render() {
    const { testid, clearStore, className } = this.props;
    return (
      <Link to="/">
        <button
          className={ className }
          onClick={ clearStore }
          data-testid={ testid }
          type="button"
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

PlayAgainButton.propTypes = {
  testid: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clearStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearStore: () => dispatch(returnInitialState()),
});

export default connect(null, mapDispatchToProps)(PlayAgainButton);
