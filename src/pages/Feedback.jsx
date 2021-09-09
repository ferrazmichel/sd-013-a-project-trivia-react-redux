import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FeedbackBoard from '../components/FeedbackBoard';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { history } = this.props;
    history.push(`/${target.name}`);
  }

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header testid="header-score" />
        <FeedbackBoard />
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClick }
          name=""
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClick }
          name="ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Feedback;
