const URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const maxResults = 10;

const get = url => fetch(url)
  .then(response => response.json())
  .then(checkResponseData);

export function checkResponseData(response) {
  if(response.error) throw response.error.message;
  return response;
}

export function search(term, startIndex) {
  const paging = `&maxResults=${maxResults}&startIndex=${startIndex}`;

  return get(`${URL}${term}${paging}`)
    .then((results) => {
      let booksObject = {};
      if(results.totalItems === 0) {
        booksObject.totalItems = 0;
        return booksObject;
      }
      const books = results.items.map((book) => {
        let newBook = {};
        if(!book.volumeInfo.authors) {
          newBook.author = 'none';
        } else if(book.volumeInfo.authors > 1) newBook.author = book.volumeInfo.authors[0]; else newBook.author = book.volumeInfo.authors[0]; 
        if(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
          newBook.imageUrl = book.volumeInfo.imageLinks.thumbnail;
        } else newBook.imageUrl = 'http://booklists.yalsa.net/content/images/placeholder.jpg';
        newBook.title = book.volumeInfo.title;
        newBook.gbID = book.id;
        return newBook;
      });
      booksObject.books = books;
      booksObject.totalItems = results.totalItems;
      return booksObject;
    });
}

export function getBook(id) {
  return get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then((result) => {
      let newBook = {};
      if(!result.volumeInfo.authors) {
        newBook.author = 'none';
      } else if(result.volumeInfo.authors.length > 1) newBook.author = result.volumeInfo.authors[0]; else newBook.author = result.volumeInfo.authors[0]; 
      if(result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail) {
        newBook.imageUrl = result.volumeInfo.imageLinks.thumbnail;
      } else newBook.imageUrl = 'http://booklists.yalsa.net/content/images/placeholder.jpg';
      newBook.title = result.volumeInfo.title;
      if(result.volumeInfo.description) newBook.description = result.volumeInfo.description;
      return newBook;
    });
}