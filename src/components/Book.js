import React, { Component } from 'react';

export default class Book extends Component {

  render() {
    const { author, title, description, imageUrl } = this.props.book;

    return (
      <li>
        <h2>{title} {(author !== 'none') && <span className="author">by {author}</span>}</h2>
        <p>{description}</p>
        <img src={imageUrl}/>
      </li>
    );
  }
}