import React, { Component } from 'react';
import { search } from '../services/booksApi';
import Search from './Search';
import Books from './Books';
import Paging from './Paging';

export default class App extends Component {

  state = {
    topic: '',
    loading: false,
    error: null,
    totalItems: 0,
    page: 1,
    perPage: 10,
    books: [],
    startIndex: 0
  };

  searchBooks = () => {
    const { topic, page, perPage, startIndex } = this.state;

    this.setState({ loading: true });

    search({ topic, startIndex })
      .then(({ totalItems, items}) => {
        const books = items;
        this.setState({ totalItems, books, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));
  };

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchBooks);
  };

  handlePage = ({ page }) => {
    const { startIndex } = this.state;
    page < this.state.page ? this.setState({ startIndex: startIndex - 10 }) : this.setState({ startIndex: startIndex + 10 });
    this.setState({ page }, this.searchBooks);
  }

  render() {
    const { books, loading, error, totalItems, page, perPage, topic } = this.state;

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
        <main>
          <section className="notifications">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
          </section>
          <section>
            <Paging
              topic={topic}
              totalItems={totalItems}
              page={page}
              perPage={perPage}
              onPage={this.handlePage}/>
            <Books books={books}/>
          </section>
        </main>
      </div>
    )
  }
}