import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GamePage extends Component {
  componentDidMount() {
    const { questions } = this.props;
    questions();
  }

  render() {
    return (
      <div>
        <h1>oi</h1>
      </div>
    );
  }
}

GamePage.propTypes = {
  startGame: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ questions: { questions } }) => ({
  questions,
});

export default connect(mapStateToProps)(GamePage);
