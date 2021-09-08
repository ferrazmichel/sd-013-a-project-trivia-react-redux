import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionsIndex: 0,
      loading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { configs } = this.props;
    const questions = mountQuestions(configs);
    this.getQuestions(questions);
  }

  getQuestions(questions) {
    this.setState({
      questions,
      loading: false,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
    }));
  }

  render() {
    const { question, questionsIndex, loading } = this.state;
    return (
      <>
        <Header />
        {
          loading ? <p>Loading...</p> : <Question question={ question[questionsIndex] } />
        }
      </>
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
  configs: propTypes.shape({
    difficulty: PropTypes.string,
  cattegory: PropTypes.string,
  type: PropTypes.string,}),
}.isRequired;

export default connect(mapStateToProps)(GamePage);
