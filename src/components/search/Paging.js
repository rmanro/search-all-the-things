import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Paging.css';

export default class Paging extends Component {

  static propTypes = {
    page: PropTypes.number,
    onPage: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    totalItems: PropTypes.number,
    perPage: PropTypes.number
  };

  handlePage(increment) {
    const { page, onPage, searchTerm } = this.props;
    onPage({ page: page + increment, searchTerm: searchTerm });
  }

  render() {
    const { totalItems, page, perPage, searchTerm } = this.props;

    const totalPages = Math.ceil(totalItems / perPage);

    return (
      <section className={styles.paging}>
        <div>
          <span>Page {page} of {totalPages}<br /></span>
          <button onClick={() => this.handlePage(-1)} disabled={page === 1}>&lt; Prev</button>
          <button onClick={() => this.handlePage(1)} disabled={page === totalPages}>Next &gt;</button>
          <span>{totalItems} Total Books</span>
        </div>
        <div>
          <h1>Results for &quot;{searchTerm}&quot;</h1>
        </div>
      </section>
    );
  }
}