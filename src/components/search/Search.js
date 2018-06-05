import React, { Component } from 'react';
import Books from '../books/Books';
import SearchForm from './SearchForm';
import Paging from './Paging';
import { search } from '../../services/bookApi';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import style from './Search.css';

const getSearch = location => location ? location.search : '';

export default class Search extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    books: null,
    error: null,
    searchTerm: '',
    totalItems: null,
    page: 1,
    perPage: 10,
    startIndex: 0,
    paging: false
  };

  componentDidMount() {
    this.searchFromQuery(this.props.location.search);
  }

  UNSAFE_componentWillReceiveProps({ location }) {
    const next = getSearch(location);
    const current = getSearch(this.props.location);
    if(current === next) return;
    this.searchFromQuery(next);
  }

  searchFromQuery(query) {
    const { search: searchTerm, startIndex } = queryString.parse(query);
    this.setState({ searchTerm, startIndex: +startIndex });
    if(startIndex === 0) {this.setState({ page: 1 });}
    else this.setState({ page: (startIndex / 10) + 1 });
    if(!searchTerm) return;

    search(searchTerm, startIndex)
      .then(({ books, totalItems }) => {
        this.setState({ books: books, totalItems: totalItems });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  makeSearch = () => {
    this.setState({ error: null });
    const { searchTerm, startIndex } = this.state;

    const query = {
      search: searchTerm || '',
      startIndex: startIndex || 0
    };

    this.props.history.push({
      search: queryString.stringify(query)
    });
  };

  handleSearch = searchTerm => {
    this.setState({ error: null, searchTerm, startIndex: 0 }, this.makeSearch);
  };

  handlePage = ({ page }) => {
    const { perPage, startIndex } = this.state;
    page < this.state.page ? this.setState({ startIndex: startIndex - perPage }) : this.setState({ startIndex: startIndex + perPage });
    this.setState({ page }, this.makeSearch);

  };

  render() {
    const { books, error, searchTerm, totalItems, page, perPage } = this.state;

    return (
      <div className={style['search-page']}>
        <SearchForm searchTerm={searchTerm} onSearch={this.handleSearch}/>
        {error && <div>Error! Try Searching Again</div>}
        {(!error && books && searchTerm) && <Paging
          searchTerm={searchTerm}
          totalItems={totalItems}
          page={page}
          perPage={perPage}
          onPage={this.handlePage}/>}
        <section className="search-results">
          {(!error && books && searchTerm) && <Books books={books}/>}
        </section>
      </div>
    );
  }
}