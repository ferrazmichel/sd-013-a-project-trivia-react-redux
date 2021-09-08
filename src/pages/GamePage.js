import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { getQuestionsFetch } from '../services/Api';
import { fetchQuestionsThunk } from '../redux/actions/index';
import GameTrivia from '../components/GameTrivia';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    // this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchThunk = this.fetchThunk.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchThunk();
  }

  /* async fetchQuestions() {

    const questionsFetch =  await getQuestionsFetch();
    this.setState({
      questions: questionsFetch.results,
      loading: false,
    });
  } */

  async fetchThunk() {
    const { getQuestionsThunk } = this.props;
    await getQuestionsThunk();
  }

  handleNextQuestion() {
    const MAX_LIMIT = 4;
    const { index } = this.state;
    if (index === MAX_LIMIT) {
      this.setState({ index: 4 });
    } else {
      this.setState({ index: index + 1 });
    }
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <Header />
        <GameTrivia questions={ questions[index] } />
        <button
          type="button"
          onClick={ this.handleNextQuestion }
        >
          Próxima Pergunta

        </button>
      </div>

    );
  }
}

GamePage.propTypes = {
  getQuestionsThunk: PropTypes.func.isRequired,
  questions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsThunk: () => dispatch(fetchQuestionsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
