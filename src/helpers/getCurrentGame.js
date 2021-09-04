const getToken = localStorage.getItem('token');
const parseToken = JSON.parse(getToken);

const getCurrentGame = () => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${parseToken}`)
    .then((response) => response.json()
      .then((data) => data))
);

export default getCurrentGame;
