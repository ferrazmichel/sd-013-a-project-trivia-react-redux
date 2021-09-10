import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Home from '../components/Home';

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
      <div>
        <Header
          testID="header-score"
        />
        <h2>Game Page</h2>
        <main>
          <Question />
          <Home />

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
