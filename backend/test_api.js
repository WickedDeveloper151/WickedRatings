const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '
  }
};

fetch('https://api.themoviedb.org/3/search/tv?query=Breaking+Bad', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));