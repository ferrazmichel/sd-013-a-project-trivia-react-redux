import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeDisabled, fetchQuestionsThunk } from '../redux/actions/index';
import GameTrivia from '../components/GameTrivia';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.fetchThunk = this.fetchThunk.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchThunk();
  }

  async fetchThunk() {
    const { getQuestionsThunk } = this.props;
    await getQuestionsThunk();
  }

  handleNextQuestion() {
    const { change } = this.props;
    let { disabledButton } = this.props;
    const { index } = this.state;
    const FOUR = 4;
    if (index === FOUR) {
      this.setState({ index: 4 });
    } else {
      this.setState({ index: index + 1 });
    }
    disabledButton = false;
    change(disabledButton);
  }

  render() {
    const { index } = this.state;
    const { questions, loading } = this.props;
    if (loading === true) return <h1>Carregando as perguntas</h1>;
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
  loading: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.isLoading,
  token: state.game.token,
  disabledButton: state.game.disabledButton,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsThunk: () => dispatch(fetchQuestionsThunk()),
  change: (payload) => dispatch(changeDisabled(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
