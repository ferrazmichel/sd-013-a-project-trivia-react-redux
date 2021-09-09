import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchApiQuestions } from '../redux/actions';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // teste
    };
    this.fetchGravater = this.fetchGravater.bind(this);
    this.gameInfo = this.gameInfo.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    this.fetchGravater();
    fetchApi();
  }

  // async fetchBug() {
  //   const { fetchApi } = this.props;
  //   const api = await fetchApi();
  //   return api;
  // }

  fetchGravater() {
    const { userEmail } = this.props;
    const LowCaseEmail = userEmail.toLowerCase().trim();
    const hashEmail = md5(LowCaseEmail).toString();
    return (<img
      data-testid="header-profile-picture"
      alt={ hashEmail }
      src={ `https://www.gravatar.com/avatar/${hashEmail}` }
    />);
  }

  gameInfo() {
    const { questions } = this.props;

    return (
      <div>
        {
          questions.map((question, index) => (
            <div key={ index }>
              <p data-testid="question-category">
                Category:
                <span>{question.category}</span>
              </p>
              <p data-testid="question-text">
                Question:
                <span>{question.question}</span>
              </p>
              <ul>
                <li key={ index }>
                  <button type="button" data-testid="correct-answer">
                    {question.correct_answer}
                  </button>
                </li>
                {question.incorrect_answers.map((incorrect, i) => (
                  <li key={ i }>
                    <button type="button" data-testid={ `wrong-answer-${i}` }>
                      {incorrect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { userPlayer } = this.props;
    return (
      <main>
        <header>
          { this.fetchGravater() }
          <p data-testid="header-player-name">{userPlayer}</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        {this.gameInfo()}
      </main>
    );
  }
}

Trivia.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  userEmail: PropTypes.shape({
    toLowerCase: PropTypes.func,
  }).isRequired,
  userPlayer: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.results,
  userEmail: state.user.email,
  userPlayer: state.user.player,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApiQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
