const myBooks = [];

function Book(title, author, numberOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
};

function addBookToLibrary(title, author, numberOfPages, isRead){
    const newBook = new Book (title, author, numberOfPages, isRead)
    myBooks.push(newBook);
};

addBookToLibrary('Laravel', 'Jeffry', '217', true)

function showBooks(){
    const bookContainer = document.querySelector('.container');
    myBooks.forEach((book)=>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard')

        const bookTitle = document.createElement('h2');
        bookTitle.classList.add('bookTitle');
        bookTitle.textContent = book.name;
        bookCard.appendChild(bookTitle)

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('bookAuthor');
        bookAuthor.textContent = book.author;
        bookCard.appendChild(bookAuthor);

        const bookPage = document.createElement('p');
        bookPage.classList.add('bookPage');
        bookPage.textContent = book.numberOfPages;
        bookCard.appendChild(bookPage);

        const isRead = document.createElement('p');
        isRead.classList.add('isRead');
        isRead.textContent = (book.isRead ? 'Yes' : 'No');
        bookCard.appendChild(isRead)

        bookContainer.appendChild(bookCard);
    });
};

showBooks();