import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { assertionsLocalStorage, scorelocalStorage } from '../services/localstage';

class FeedbackPage extends Component {
  render() {
    const number = 3;
    return (
      <div>
        <Header />
        {assertionsLocalStorage() < number ? (
          <p data-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          <p data-testid="feedback-text">Mandou bem!</p>
        )}
        <div>
          <span data-testid="feedback-total-question"></span>
          {assertionsLocalStorage()}
          </span>
        </div>
        <div>
          <span data-testid="feedback-total-score"></span>
          {scorelocalStorage()}
          </span>
        </div>
        <Link data-testid="btn-play-again" to="/">
          Play Again
        </Link>
        <Link data-testid="btn-ranking" to="/rankingpage">
          Raking
        </Link>
      </div>
    );
  }
}

FeedbackPage.propTypes = {
    feedback: PropTypes.func,
  }.isRequired;

  export default connect()(FeedbackPage);
