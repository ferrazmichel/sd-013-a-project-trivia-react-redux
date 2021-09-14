import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayQuestion from '../components/DisplayQuestion';
import Header from '../components/Header';
import '../styles/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      questions: [],
    };

    this.questionsFetch = this.questionsFetch.bind(this);
  }

  componentDidMount() {
    this.questionsFetch();
    this.saveScore();
  }

  saveScore() {
    const { gravatarEmail, name, assertions, score } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    }));
  }

  questionsFetch() {
    const { token, difficulty, questionType } = this.props;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}&difficulty=${difficulty}&type=${questionType}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data.results, fetching: false }));
  }

  render() {
    const { fetching, questions } = this.state;
    const { history } = this.props;
    const loading = <p>Loading...</p>;
    return (
      <div>
        <Header />
        <div className="container-game">
          {fetching
            ? loading : <DisplayQuestion questions={ questions } history={ history } />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  gravatarEmail: state.user.email,
  name: state.user.name,
  assertions: state.user.assertions,
  score: state.user.score,
  difficulty: state.user.difficulty,
  questionType: state.user.questionType,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({}).isRequired,
  difficulty: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
