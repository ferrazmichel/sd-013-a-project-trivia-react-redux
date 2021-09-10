import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchApiQuestions } from '../redux/actions';
import Question from './Question';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rigthBoarder: '',
      // wrongBoarder: '',
      disable: false,
      countdown: 30,
      indexQuestios: 0,
    };
    this.fetchGravater = this.fetchGravater.bind(this);
    // this.gameInfo = this.gameInfo.bind(this);
    // this.changeColor = this.changeColor.bind(this);
    this.timerDisable = this.timerDisable.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    this.fetchGravater();
    fetchApi();
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (prevProps.questions !== questions) {
      this.countdown();
      this.timerDisable();
    }
  }

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

  // changeColor() {
  //   this.setState({
  //     rigthBoarder: 'green-border',
  //     wrongBoarder: 'red-border',
  //   });
  // }

  timerDisable() {
    const TIMER = 30000;

    setTimeout(() => {
      this.setState({ disable: true });
    }, TIMER);
  }

  countdown() {
    const TIME_RELOAD = 1000;
    this.timeout = setInterval(() => {
      const { countdown } = this.state;
      this.setState({ countdown: countdown - 1 });
    }, TIME_RELOAD);
  }

  // gameInfo() {
  //   const { questions } = this.props;
  //   const { rigthBoarder, wrongBoarder, disable, indexQuestios } = this.state;
  //   if (questions.length > 0) {
  //     console.log(questions);
  //     const question = questions[indexQuestios];
  //     console.log(question);
  //     return (
  //       <div>
  //         <p data-testid="question-category">
  //           Category:
  //           <span>{question.category}</span>
  //         </p>
  //         <p>
  //           Question:
  //           <span data-testid="question-text">{question.question}</span>
  //         </p>
  //         <ul>
  //           <li>
  //             <button
  //               disabled={ disable }
  //               className={ rigthBoarder }
  //               data-testid="correct-answer"
  //               onClick={ this.ChangeColor }
  //               type="button"
  //             >
  //               {question.correct_answer}
  //             </button>
  //           </li>
  //           {question.incorrect_answers.map((incorrect, i) => (
  //             <li key={ i }>
  //               <button
  //                 disabled={ disable }
  //                 className={ wrongBoarder }
  //                 data-testid={ `wrong-answer-${i}` }
  //                 onClick={ this.ChangeColor }
  //                 type="button"
  //               >
  //                 {incorrect}
  //               </button>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { userPlayer, questions } = this.props;
    const { disable, countdown, indexQuestios } = this.state;
    if (questions.length > 0) {
      return (
        <main>
          <header>
            { this.fetchGravater() }
            <p data-testid="header-player-name">{userPlayer}</p>
            <p data-testid="header-score">Placar: 0</p>
          </header>
          <h3>{ countdown }</h3>
          { disable && clearInterval(this.timeout)}
          <Question question={ questions[indexQuestios] } />
        </main>
      );
    }
    return <p> Loading...</p>;
  }
}

Trivia.propTypes = {
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
