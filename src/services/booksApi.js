// const API_KEY = 'AIzaSyCqCifDvOn9VhyZ-5MIiJ7XB-bVWciuZBM'
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='
const maxResults = 40;

const throwJson = json => { throw json; };
const get = url => fetch(url)
  .then(r => r.ok ? r.json() : r.json().then(throwJson));

export function search({ topic }) {
  const paging = `&maxResults=${maxResults}`;

  return get(`${BASE_URL}${topic}${paging}`);
}