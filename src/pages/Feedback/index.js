import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: '0',
    };
    this.fetchAssertions = this.fetchAssertions.bind(this);
    this.setAssertions = this.setAssertions.bind(this);
  }

  componentDidMount() {
    const entireLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = entireLocalStorage;
    this.setAssertions(assertions);
  }

  setAssertions(assertions) {
    this.setState({ assertions });
  }

  fetchAssertions() {
    const { assertions } = this.state;
    let feedbackMessage = '';
    const avaliator = 3;
    if (assertions < avaliator) {
      feedbackMessage = 'Podia ser melhor...';
    } else {
      feedbackMessage = 'Mandou bem!';
    }
    return feedbackMessage;
  }

  render() {
    const { userName, score } = this.props;
    const { assertions } = this.state;
    const feedbackMessage = this.fetchAssertions();
    return (
      <>
        <header>
          <img src="" data-testid="header-profile-picture" alt="header-profile" />
          <h3 data-testid="header-player-name">{ userName }</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <div data-testid="feedback-text">
          { feedbackMessage }
        </div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = ({ loginReducer, scoreReducer }) => ({
  userName: loginReducer.name,
  score: scoreReducer.score,
});

FeedBack.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
