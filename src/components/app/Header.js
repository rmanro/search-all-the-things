import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';
import home from './home.png';
import about from './about.png';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <section className="header-container">
          <h1>Book Search</h1>
        </section>
        <nav>
          <ul>
            <li><Link to="/"><img src={home}/></Link></li>
            <li><Link to="/about"><img src={about}/></Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}