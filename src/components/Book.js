import React, { Component } from 'react';

export default class Book extends Component {

  render() {
    const { volumeInfo } = this.props.book;
    const { title, description, authors } = volumeInfo;
    // const imageUrl = volumeInfo.imageLinks.thumbnail;

    return (
      <li>
        <h2>{title} by {authors}</h2>
        <p>{description}</p>
        {/* <img src={imageUrl}/> */}
      </li>
    );
  }
}