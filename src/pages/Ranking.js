import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RankingList from '../components/RankingList';
import { resetScore } from '../redux/actions';

class Ranking extends React.Component {
  render() {
    const { reset } = this.props;
    return (
      <div>
        <RankingList />
        <Link to="/" data-testid="btn-go-home" onClick={ reset }> HOME </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetScore()),
});

Ranking.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
