import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import styles from './Books.css';

export default class Books extends Component {

  static propTypes = {
    books: PropTypes.array
  };

  render() {
    const { books } = this.props;

    return (
      <ul className={styles.books}>
        {books.map(book => <Book key={book.gbID} {...book}/>)}
      </ul>
    );
  }
}