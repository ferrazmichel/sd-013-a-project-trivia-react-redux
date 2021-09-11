import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/feedback" />;

    return (
      <div className="game-page">
        <Header
          testID="header-score"
        />
        <main className="game-container">
          <Question />
        </main>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.fetchReducer.questions,
  done: state.fetchReducer.done,
});

export default connect(mapStateToProps)(Game);
