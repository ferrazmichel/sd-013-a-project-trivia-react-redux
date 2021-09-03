import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { header } = this.props;
    return (
      <div>
        {header.map((element, index) => <p key={ index }>{element}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.playerReducer,
});

export default connect(mapStateToProps)(Header);
