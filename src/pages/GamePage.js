import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import Button from '../components/Button';
import mountQuestions from '../services/fetchGame';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionsIndex: 0,
      hidden: true,
      loading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.hideNextQuestionButton = this.hideNextQuestionButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
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

  hideNextQuestionButton() {
    this.setState({
      hidden: true,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
    }));
  }

  showNextQuestionButton() {
    this.setState({
      hidden: false,
    });
  }

  render() {
    const { hidden, questions, questionsIndex, loading } = this.state;
    return (
      <>
        <Header />

        {
          loading ? <p>Loading...</p> : <Question
            hide={ this.hideNextQuestionButton }
            question={ questions[questionsIndex] }
            show={ this.showNextQuestionButton }
          />
        }
        {
          !hidden && <Button
            className=""
            data-testid="btn-next"
            disabled={ hidden }
            name="Próxima"
            onClick={ this.nextQuestion }
          />
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
  configs: PropTypes.shape({
    difficulty: PropTypes.string,
    cattegory: PropTypes.string,
    type: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(GamePage);
