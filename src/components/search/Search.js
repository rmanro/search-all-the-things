import React, { Component } from 'react';
import Books from '../books/Books';
import SearchForm from './SearchForm';
import Paging from './Paging';
import { search } from '../../services/bookApi';
import PropTypes from 'prop-types';
import queryString from 'query-string';

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
    if(current === next && !this.state.paging) return;
    this.searchFromQuery(next);
  }

  searchFromQuery(query) {
    const { search: searchTerm } = queryString.parse(query);
    const { startIndex } = this.state;
    this.setState({ searchTerm });
    if(!searchTerm) return;

    search(searchTerm, startIndex)
      .then(({ books, totalItems }) => {
        this.setState({ books: books, totalItems: totalItems });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  handleSearch = searchTerm => {
    this.setState({ error: null });

    this.props.history.push({
      search: searchTerm ? queryString.stringify({ search: searchTerm }) : ''
    });
  };

  handlePage = ({ page }) => {
    const increment = 10;
    const { startIndex } = this.state;
    page < this.state.page ? this.setState({ startIndex: startIndex - increment }) : this.setState({ startIndex: startIndex + increment });
    this.setState({ page, paging: true }, this.searchFromQuery(this.props.location.search));

  };

  render() {
    const { books, error, searchTerm, totalItems, page, perPage } = this.state;

    return (
      <div>
        <SearchForm searchTerm={searchTerm} onSearch={this.handleSearch}/>
        {error && <div>{error}</div>}
        {(!error && books) && <Paging
          searchTerm={searchTerm}
          totalItems={totalItems}
          page={page}
          perPage={perPage}
          onPage={this.handlePage}/>}
        <section className="search-results">
          {(!error && books) && <Books books={books}/>}
        </section>
      </div>
    );
  }
}