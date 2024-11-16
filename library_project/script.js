const myBooks = [];
let editingBookIndex = null ;

function Book(title, author, numberOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
};

Book.prototype.toggleReadStatus = function(){
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, numberOfPages, isRead){
    const newBook = new Book (title, author, numberOfPages, isRead)

    if(editingBookIndex === null){
        myBooks.push(newBook);
    } else {
        myBooks[editingBookIndex] = newBook;
        editingBookIndex = null;
    }
    showBooks();
};



function showBooks(){
    const bookContainer = document.querySelector('.container');
    bookContainer.textContent = '';

    myBooks.forEach((book, index)=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard')

        const bookTitle = document.createElement('h2');
        bookTitle.classList.add('bookTitle');
        bookTitle.textContent = `Title: ${book.title}`;
        bookCard.appendChild(bookTitle)

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('bookAuthor');
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookPage = document.createElement('p');
        bookPage.classList.add('bookPage');
        bookPage.textContent = `Total Pages: ${book.numberOfPages}`;
        bookCard.appendChild(bookPage);

        const isRead = document.createElement('p');
        isRead.classList.add('isRead');
        isRead.textContent = `Finished before: ${(book.isRead ? 'Yes' : 'No')}`;
        bookCard.appendChild(isRead)

        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('toggle-read-button')
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.addEventListener('click', ()=>{
            book.toggleReadStatus();
            showBooks();
        })
        bookCard.appendChild(toggleReadButton);

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit Book';
        editButton.addEventListener('click', () => {
            openEditDialog(index);
        });
        bookCard.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-book-button');
        removeButton.textContent = 'Remove Book';
        removeButton.addEventListener('click', () =>{
            removeBookFromLibrary(index);
        });
        bookCard.appendChild(removeButton);


        bookContainer.appendChild(bookCard);
    });
};

function removeBookFromLibrary(index){
    myBooks.splice(index,1);
    showBooks();
}

const dialog = document.querySelector('#book-dialog');
const newBookButton = document.querySelector('#new-book-button');
const formTitle = document.querySelector('#dialog-title');
const formSubmitionButton = document.querySelector('#form-submit-button');

newBookButton.addEventListener('click', () => {
    openDialog();
});

function openDialog(){
    editingBookIndex = null ;
    formTitle.textContent = 'Add New Book';
    formSubmitionButton.textContent = 'Add Book';
    dialog.showModal();
}

function openEditDialog(index){
    editingBookIndex = index;
    const book = myBooks[index];

    document.querySelector('#title').value = book.title;
    document.querySelector('#author').value = book.author;
    document.querySelector('#pages').value = book.numberOfPages;
    document.querySelector('#hasRead').value = book.isRead;

    formTitle.textContent = 'Edit Book';
    formSubmitionButton.textContent = 'Save Change';

    dialog.showModal();
}

function closeDialog(){
    dialog.close();
};

document.querySelector('#new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const pages = document.querySelector('#pages').value
    const isRead = document.querySelector('#hasRead').checked

    addBookToLibrary(title, author, pages, isRead);
    closeDialog();
    event.target.reset();
});