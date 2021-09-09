import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INITIAL_TIME = {
  time: 30,
};

class Button extends Component {
  constructor(props) {
    super(props);

    this.resetTime = this.resetTime.bind(this);
  }

  resetTime() {
    const { nextQuestion } = this.props;

    this.setState(INITIAL_TIME);
    nextQuestion();
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.resetTime }
      >
        Próxima
      </button>
    );
  }
}

Button.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ play: { player } }) => ({
  player,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
