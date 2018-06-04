import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Book.css';

export default class Book extends Component {

  static propTypes = {
    gbID: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string
  };

  render() {
    const { gbID, imageUrl, title, author } = this.props;

    return (
      <li className={styles.book}>
        <Link to={`/books/${gbID}`}>
          <img alt={title} src={imageUrl}/>
          <h3>{title}</h3>
          <p>{author}</p>
        </Link>
      </li>
    );
  }
}