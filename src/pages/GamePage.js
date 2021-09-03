import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class GamePage extends Component {
  componentDidMount() {
    // const { questions } = this.props;
    // questions();
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
      </div>
    );
  }
}

GamePage.propTypes = {
  questions: PropTypes.object,
}.isRequired;

const mapStateToProps = ({ questions: { questions } }) => ({
  questions,
});

export default connect(mapStateToProps)(GamePage);
