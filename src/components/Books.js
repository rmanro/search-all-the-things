import React, { Component } from 'react';
import Book from './Book';

export default class Books extends Component {

  render() {
    const { books } = this.props;

    return (
      <ul>
        {books.map((book, i) => (
          <Book key={i} book={book}/>
        ))}
      </ul>
    );
  }
}