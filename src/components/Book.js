import React, { Component } from 'react';

export default class Book extends Component {

  render() {
    // let noAuthor = false;
    // let imageUrl = null;
    // console.log(this.props.book);
    const { author, title, description, imageUrl } = this.props.book;
    // const { title, description } = volumeInfo;
    // let { authors } = volumeInfo;
    // if (volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail) imageUrl = volumeInfo.imageLinks.smallThumbnail;
    // if (!authors) {noAuthor = true;}
    // else authors = authors[0];

    return (
      <li>
        <h2>{title} {(author !== 'none') && <span className="author">by {author}</span>}</h2>
        <p>{description}</p>
        <img src={imageUrl}/>
      </li>
    );
  }
}