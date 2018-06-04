import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBook } from '../../services/bookApi';
import styles from './BookDetail.css';

export default class BookDetail extends Component {

  static propTypes = {
    gbID: PropTypes.string.isRequired,
    history: PropTypes.object,
  };

  state = {
    book: null
  };

  componentDidMount() {
    getBook(this.props.gbID)
      .then(book => this.setState({ book }));
  }

  handleBack = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { book } = this.state;

    if(book === null) return null;

    return (
      <article className={styles['book-detail']}>
        <div className='container'>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <img src={book.imageUrl} alt={book.title}/>
          <p>{!book.description && <span>No Description Available</span>}</p>
          <p>{book.description}</p>
        </div>
      </article>
    );
  }
}