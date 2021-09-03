import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiQUESTIONS from '../actions';

class Questions extends Component {
  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <div>
          <div datatest-id="question-category">
            category
          </div>
          <div datatest-id="question-text">
            questions
          </div>
        </div>
        {/* <span>time</span>
      <div>

      </div>
      <button></button> */}
      </div>
    );
  }
}

const mapStateToProps = ({ player, game }) => ({
  token: player.token,
  questions: game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(apiQUESTIONS(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
