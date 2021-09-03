import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayQuestion from '../components/DisplayQuestion';
import Header from '../components/Header';

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
  }

  questionsFetch() {
    const { token } = this.props;
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data.results, fetching: false }));
  }

  render() {
    const { fetching, questions } = this.state;
    const loading = <p>Loading...</p>;
    return (
      <div>
        <Header />
        {fetching ? loading : <DisplayQuestion questions={ questions } />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
