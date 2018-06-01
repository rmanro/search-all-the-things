import React, { Component } from 'react';
import { search } from '../services/booksApi';
import Search from './Search';
import Books from './Books';
import Paging from './Paging';
import '../styles/app.css';

export default class App extends Component {

  state = {
    topic: '',
    loading: false,
    error: null,
    totalItems: 0,
    page: 1,
    perPage: 10,
    books: [],
    startIndex: 0,
    searched: false
  };

  searchBooks = () => {
    const { topic, page, perPage, startIndex } = this.state;

    this.setState({ loading: true });

    search({ topic, startIndex })
      .then(({ totalItems, books}) => {
        if (!totalItems) {
          this.setState({ error: 'No Results found!' });
        } else {
          this.setState({ totalItems, books, error: null, searched: true });
        }
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = ({ search }) => {
    this.setState({ topic: search, page: 1, error: null }, this.searchBooks);
  };

  handlePage = ({ page }) => {
    const increment = 10;
    const { startIndex } = this.state;
    page < this.state.page ? this.setState({ startIndex: startIndex - increment }) : this.setState({ startIndex: startIndex + increment });
    this.setState({ page }, this.searchBooks);
  }

  render() {
    const { books, loading, error, totalItems, page, perPage, topic, searched } = this.state;

    return (
      <div>
        <header>
          <div className="header-container">
            <h1>Book Search</h1>
          </div>
          <div className="search-container">
            <Search onSearch={this.handleSearch}/>
          </div>
          <section className="notifications">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </section>
        </header>
        <main>
          <section>{searched &&
            <Paging
              topic={topic}
              totalItems={totalItems}
              page={page}
              perPage={perPage}
              onPage={this.handlePage}/>}
            <Books books={books}/>
          </section>
        </main>
      </div>
    )
  }
}