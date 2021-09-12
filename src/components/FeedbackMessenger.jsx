import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import etabom from '../files/sounds/e-ta-bom.mp3';
import naoconsegue from '../files/sounds/naoconsegue.mp3';
import yeah from '../files/sounds/yeah.mp3';

class FeedBackMessenger extends Component {
  render() {
    const { rightQuestions } = this.props;
    const threeRightAnswer = 3;
    const fiveRightAnswer = 5;

    const messageFeedback = () => {
      if (rightQuestions === fiveRightAnswer) {
        return (
          <>
            <h2 className="text-center">PARABÉNS, VOCÊ ACERTOU TODAS!</h2>
            <Sound
              url={ yeah }
              volume={ 15 }
              playStatus={ Sound.status.PLAYING }
              onLoading={ this.handleSongLoading }
              onPlaying={ this.handleSongPlaying }
              onFinishedPlaying={ this.handleSongFinishedPlaying }
            />
          </>
        );
      }
      if (rightQuestions >= threeRightAnswer) {
        return (
          <>
            <h2 className="text-center">Mandou bem!</h2>
            <Sound
              url={ etabom }
              playStatus={ Sound.status.PLAYING }
              onLoading={ this.handleSongLoading }
              onPlaying={ this.handleSongPlaying }
              onFinishedPlaying={ this.handleSongFinishedPlaying }
            />
          </>
        );
      }
      return (
        <>
          <h2 className="text-center">Podia ser melhor...</h2>
          <Sound
            url={ naoconsegue }
            playStatus={ Sound.status.PLAYING }
            onLoading={ this.handleSongLoading }
            onPlaying={ this.handleSongPlaying }
            onFinishedPlaying={ this.handleSongFinishedPlaying }
          />
        </>

      );
    };

    return messageFeedback();
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
});

FeedBackMessenger.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackMessenger); // add connect
