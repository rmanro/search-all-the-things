import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';
import home from './home.png';
import about from './about.png';
import search from './search.png';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <section className="header-container">
          <h1>All The Books</h1>
        </section>
        <nav>
          <ul>
            <li><Link to="/search"><img src={search}/></Link></li>
            <li className="about-icon"><Link to="/about"><img src={about}/></Link></li>
            <li className="home-icon"><Link to="/"><img src={home}/></Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}