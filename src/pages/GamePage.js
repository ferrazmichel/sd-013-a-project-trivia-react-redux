import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class GamePage extends Component {
  render() {
    return (
      <Header />
    );
  }
}

const mapStateToProps = ({ gameSettings: { difficulty, cattegory, type } }) => ({
  configs: {
    difficulty,
    cattegory,
    type,
  },
});

GamePage.propTypes = {
  difficulty: PropTypes.string,
  cattegory: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(GamePage);
