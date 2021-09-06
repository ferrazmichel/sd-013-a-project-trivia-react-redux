import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedbacks extends Component {
  constructor(props) {
    super(props) {
      this.handleClick = this.handleClick.bind(this);
    }
  }

  handleClick(testId) {
    const { history } = this.props;
    if(testId === 'Ranking') {
      history.push('/ranking');
    } 
    if (testId === 'Jogar Novamente!') {
      history.push('/gamepage');
    }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Feedbacks;
