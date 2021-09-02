import React from 'react';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
  }

  componentDidMount() {
    const { emailUser } = this.props;
    const img = md5('MyEmailAddress@example.com').toString();
    trocaState(img);
  }

  trocaState(valor) {
    this.setState({ img: valor });
  }

  render() {
    const { img } = this.state;
    return (
      <img src={ `https://www.gravatar.com/avatar/${img}` } />
    );
  }
}
const mapStateToProps = (state) => ({
  emailUser: state.
})

export default Header;
