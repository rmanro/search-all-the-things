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
        } else if(book.volumeInfo.authors[1]) newBook.author = book.volumeInfo.authors[0]; else newBook.author = book.volumeInfo.authors; 
        if(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) newBook.imageUrl = book.volumeInfo.imageLinks.smallThumbnail;
        newBook.title = book.volumeInfo.title;
        newBook.description = book.volumeInfo.description;
        return newBook;
      });
      booksObject.books = books;
      booksObject.totalItems = results.totalItems;
      return booksObject;
    });
}