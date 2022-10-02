window.onload = function () {
  let main_container = document.querySelector('.main-container');
  let no_books_message = document.querySelector('.no-books-message');
  let myLibrary = [];

  displayBooks();

  function displayBooks() {
    if (myLibrary.length === 0) {
      no_books_message.textContent = 'There are currently no books';
    }
    else {
      for (let book of myLibrary) {
        let bookContainer = document.createElement('div');
        bookContainer.className = 'book';
        main_container.appendChild(bookContainer).cloneNode(true);
      }
    }
  }

  function Book(author, title, pageNumber, hasBeenRead) {
    this.author = author;
    this.title = title;
    this.pageNumber = pageNumber;
    this.hasBeenRead = hasBeenRead;
  }

  function addBookToLibrary() {

  }
}
