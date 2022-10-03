window.onload = function () {

  let allInputs = Array.from(document.querySelectorAll('input'));
  let main_container = document.querySelector('.main-container');
  let no_books_message = document.querySelector('.no-books-message');
  let create_book_form = document.querySelector('.create-book-form');
  let close_modal_button = document.querySelector('.close-modal-button');
  let modal = document.querySelector('.modal');
  let add_book_button = document.querySelector('.add-book-button');
  let myLibrary = [];

  displayBooks();

  //modal.addEventListener('change', removeInputValue)
  create_book_form.addEventListener('submit', addBookToLibrary);
  close_modal_button.addEventListener('click', closeModal);
  add_book_button.addEventListener('click', openModal);

  function removeInputValue() {
    for (let input of allInputs) {
      input.value = ''
    }
  }

  function openModal() {
    removeInputValue();
    modal.style.visibility = "visible";
  }

  function closeModal() {
    modal.style.visibility = "hidden";
  }

  function displayBooks() {
    if (myLibrary.length === 0) {
      no_books_message.textContent = 'There are currently no books';
    }
    else {
      for (let book of myLibrary) {
        addBookContainer();
      }
    }
  }

  function Book(author, title, pageNumber, hasBeenRead) {
    this.author = author;
    this.title = title;
    this.pageNumber = pageNumber;
    this.hasBeenRead = hasBeenRead;
  }

  function addBookToLibrary(e) {
    let author = create_book_form.elements['author'].value;
    let title = create_book_form.elements['title'].value;
    let pageNumber = create_book_form.elements['page_number'].value;
    myLibrary.push(new Book(author, title, pageNumber, false));
    addBookContainer();
    modal.style.visibility = 'hidden';
    e.preventDefault();
  }

  function addBookContainer() {
    no_books_message.textContent = '';
    let bookContainer = document.createElement('div');
    bookContainer.className = 'book';
    main_container.appendChild(bookContainer).cloneNode(true);
    
  }
}
