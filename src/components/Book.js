import React, { Component } from 'react';

export default class Book extends Component {

  render() {
    const { title, author, description, imageUrl } = this.props.book;

    return (
      <li>
        <h2>{title} by {author}</h2>
        <p>{description}</p>
        <img src={imageUrl}/>
      </li>
    );
  }
}