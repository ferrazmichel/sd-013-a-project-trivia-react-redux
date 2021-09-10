const FetchAPI = () => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default FetchAPI;
