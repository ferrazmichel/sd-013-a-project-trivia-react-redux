import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApiQuestions } from '../redux/actions';
// import md5 from 'crypto-js/md5';

class Trivia extends Component {
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  render() {
    return (
      <div>
        <p>Hello Player</p>
      </div>
    );
  }
}

Trivia.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  info: state.trivia.results,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApiQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
