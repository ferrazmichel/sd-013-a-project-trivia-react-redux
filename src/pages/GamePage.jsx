import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  componentDidMount() {
    const url = 'https://opentdb.com/api_token.php?command=request';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => localStorage.setItem('token', (data.token)));
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default GamePage;
