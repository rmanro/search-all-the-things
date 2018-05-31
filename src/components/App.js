import React, { Component } from 'react';
import { search } from '../services/booksApi';
import Search from './Search';

export default class App extends Component {

  state = {
    topic: '',
    loading: false,
    error: null,
    totalItems: 0,
    page: 1,
    perPage: 10,
    books: []
  };

  searchBooks = () => {
    const { topic, page, perPage } = this.state;

    this.setState({ loading: true });

    search({ topic })
      .then(({ totalItems, items}) => {
        this.setState({ totalItems, items, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchBooks);
  };

  render() {
    const { books, loading, error } = this.state;

    return (
      <div>
        <header>
          <div className="header-container">
            <h1>Book Search</h1>
          </div>
          <div className="search-container">
            <Search onSearch={this.handleSearch}/>
          </div>
        </header>
      </div>
    )
  }
}