import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';
import GameBoard from '../components/GameBoard';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { getQs, token } = this.props;
    getQs(token);
  }

  render() {
    const { questions } = this.props;
    if (questions.length < 1) return <h3>Loading...</h3>;
    return (
      <div>
        <Header />
        <GameBoard question={ questions[0] } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQs: (payload) => dispatch(getQuestions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  getQs: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
