import React, { Component } from 'react';
import styles from './About.css';

export default class About extends Component {
  render() {
    return <div className={styles.about}><p>Search for books by author or title.</p><p>Uses the Google Books API.</p><p>Made by Ryan Manro using React.</p></div>;
  }
}