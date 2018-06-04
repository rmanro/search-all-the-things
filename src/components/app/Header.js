import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <section className="header-container">
          <h1>Book Search</h1>
        </section>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}