window.onload = function () {
  // DOM elements
  let main_container = document.querySelector('.main-container');
  let create_book_form = document.querySelector('.create-book-form');
  let close_modal_button = document.querySelector('.close-modal-button');
  let form_modal = document.querySelector('.form-modal');
  let add_book_button = document.querySelector('.add-book-button');
  let display_title = document.querySelector('.display-title');
  let display_author = document.querySelector('.display-author');
  let display_number_of_pages = document.querySelector('.display-number-of-pages');
  let display_read_status = document.querySelector('.display-read-status')
  let right_sidebar_content = document.querySelector('.right-sidebar-contents');
  let mark_as_read = document.querySelector('.mark-as-read');
  let top_right_sidebar = document.querySelector('.top-right-sidebar');
  let remove_book_button = document.querySelector('.remove-book-button');
  let remove_book_modal = document.querySelector('.remove-book-modal');
  let confirm_remove = document.querySelector('.confirm-remove');
  let deny_remove = document.querySelector('.deny-remove');
  let book_not_read = document.querySelector('.book-not-read');
  let instructions = document.querySelector('.instructions');

  let allInputs = Array.from(document.querySelectorAll('input'));
  let myLibrary = [];

  displayBooks();

  create_book_form.addEventListener('submit', addBookToLibrary);
  close_modal_button.addEventListener('click', closeModal);
  add_book_button.addEventListener('click', openModal);
  mark_as_read.addEventListener('click', markBookAsRead);
  deny_remove.addEventListener('click', closeRemoveModal);
  confirm_remove.addEventListener('click', removeBook);
  remove_book_button.addEventListener('click', openRemoveModal);

  function closeRemoveModal() {
    remove_book_modal.style.visibility = 'hidden';
  }

  function openRemoveModal() {
    remove_book_modal.style.visibility = 'visible';
    let current_book = getCurrentBook();

    if (!current_book.hasBeenRead) {
      book_not_read.textContent = "You have not read the book yet";
    }
    else {
      book_not_read.textContent = '';
    }
  }

  function removeBook() {
    let current_book_index = myLibrary.findIndex(book => {
      return book.title === top_right_sidebar.childNodes[5].textContent;
    });
    myLibrary.splice(current_book_index, 1);
    closeRemoveModal();
    closeBookDetails();
    displayBooks();
  }

  function closeBookDetails() {
    right_sidebar_content.style.visibility = 'hidden';
  }

  function getCurrentBook() {
    return myLibrary.find(book => {
      return book.title === top_right_sidebar.childNodes[5].textContent;
    });
  }

  function markBookAsRead() {
    let current_book = getCurrentBook();
    current_book.hasBeenRead = true;
    changeReadStatus(current_book);
  }

  function changeReadStatus(current_book) {
    display_read_status.textContent = `${current_book.hasBeenRead ? 'Read' : 'Unread'}`;
  }

  function displayBookDetails() {

    right_sidebar_content.style.visibility = 'visible';
    let current_book = myLibrary.find(book => {
      return book.title === this.childNodes[0].textContent;
    })

    display_title.textContent = current_book.title;
    display_author.textContent = current_book.author;
    display_number_of_pages.textContent = current_book.pageNumber;
    changeReadStatus(current_book);

    let book_container = Array.from(document.querySelectorAll('.book'));
    for (let book of book_container) {
      book.style.color = 'black';
    }
    this.style.color = 'red';
  }

  function removeInputValue() {
    for (let input of allInputs) {
      input.value = ''
    }
  }

  function openModal() {
    removeInputValue();
    form_modal.style.visibility = "visible";
  }

  function closeModal() {
    form_modal.style.visibility = "hidden";
  }

  function displayBooks() {
    while (main_container.firstChild) {
      main_container.removeChild(main_container.lastChild);
    }
    if (myLibrary.length === 0) {
      let no_books_message = document.createElement('h1');
      no_books_message.className = 'no-books-message';
      no_books_message.textContent = 'There are currently no books in your library';
      main_container.appendChild(no_books_message);
      instructions.style.visibility = 'hidden';
    }
    else {
      for (let book of myLibrary) {
        addBookContainer(book);
      }
      instructions.style.visibility = 'visible';
    }
  }

  function Book(author, title, pageNumber, hasBeenRead) {
    this.author = author;
    this.title = title;
    this.pageNumber = pageNumber;
    this.hasBeenRead = hasBeenRead;
  }

  function addBookToLibrary(e) {
    let title = this.elements['title'];
    if (myLibrary.length > 0 && myLibrary.some(element => element.title === title.value)) {
      alert('Title must be unique');

    }
    else {

      let author = this.elements['author'].value;
      let pageNumber = this.elements['page_number'].value;
      let book = new Book(author, title.value, pageNumber, false);
      myLibrary.push(book);
      displayBooks();
      form_modal.style.visibility = 'hidden';

    }

    e.preventDefault();
  }

  function addBookContainer(book) {
    let bookContainer = document.createElement('button');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let readCheckMark = document.createElement('div');
    bookTitle.textContent = book.title;
    bookAuthor.textContent = `By: ${book.author}`;

    readCheckMark.setAttribute('src', './images/checkmark-32.gif');
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.setAttribute('type', 'button');
    bookContainer.className = 'book';
    bookContainer.addEventListener('click', displayBookDetails);

    main_container.appendChild(bookContainer).cloneNode(true);
  }
}
