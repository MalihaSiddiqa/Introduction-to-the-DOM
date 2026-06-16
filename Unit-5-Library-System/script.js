
const addBooksection=document.querySelector(".add-book-section");
const toggleFormBtn=document.querySelector(".toggle-btn");
const typeSelect=document.getElementById("type");
const ebookDetails=document.getElementById("ebook-details");
const bookForm=document.getElementById("book-form");
const bookList=document.getElementById("book-list");

let books=[];
class Book {
    constructor(title,author) {
        this.title=title;
        this.author=author;
        this.id=Date.now();
        this.type="physical";
        this.available=true;
        this.borrower=null;
    }
    borrow(borrowerName){
        this.borrower=borrowerName;
        this.available=false;
    }
    markReturn(){
        this.borrower=null;
        this.available=true;
    }
    //Feature 4:General HTML for each book using a method inside the book class.

   getHTML(){
     const bookCard=document.createElement("div");
     bookCard.classList.add("book-card");
     bookCard.dataset.id=this.id;
     const statusText=this.available ? "Available" : `Borrowed by ${this.borrower}`;
     const buttonClass=this.available ? "btn btn-borrow":"btn btn-return";
     const buttonText=this.available ? "Borrow" : "Return";
     bookCard.innerHTML=`
     <h3 class="book-title">Title: ${this.title}</h3>
     <div class="book-meta">Author: ${this.author}</div>
     <div class="book-meta">Type: ${this.type}</div>

     <div class="book-meta">Status: ${statusText}</div>
     <div class="book-actions">
       <button class="${buttonClass}">${buttonText}</button>
       <button class="btn btn-remove">Remove</button>
       </div>
       `;
     return bookCard;
   }
   
}

//feature 9:Create an E book class
class Ebook extends Book{
    constructor(title,author,fileSize){
        super(title,author);
        this.type="ebook";
        this.fileSize=fileSize;
    }
    borrow(borrowerName) {
        this.borrower = borrowerName;
    }
    markReturn() {
        this.borrower = null;
    }
    getHTML() {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card", "ebook");
        bookCard.dataset.id = this.id;
        const hasBorrower = this.borrower !== null;
        const statusText = hasBorrower ? `Borrowed by ${this.borrower}` : "Available";
        const buttonClass = hasBorrower ? "btn btn-return" : "btn btn-download";
        const buttonText = hasBorrower ? "Return" : "Download";

        bookCard.innerHTML = `
            <h3 class="book-title">${this.title}</h3>
            <div class="book-meta">Author: ${this.author}</div>
            <div class="book-meta">File Size: ${this.fileSize} MB</div>
            <div class="book-meta">Status: ${statusText}</div>
            <div class="book-actions">
                <button class="${buttonClass}">${buttonText}</button>
                <button class="btn btn-remove">Remove</button>
            </div>
        `;

        return bookCard;
    }
}
//Feature 1:Toggle Add Book form

toggleFormBtn.addEventListener("click",() => {
    if (addBooksection.style.display==="none") {
     addBooksection.style.display="block";
    toggleFormBtn.textContent="Hide Form";
    }
    else{
     addBooksection.style.display="none";
    toggleFormBtn.textContent="Add New Book";

    }
});

//Feature 2: Show file size field only when book type is E-book.

typeSelect.addEventListener("change",()=>{
    if(typeSelect.value === "ebook"){
        ebookDetails.style.display="block";
    }
    else {
        ebookDetails.style.display="none";
    }     
});

//Feature 3a: Create a new book to the list when the form is submitted.

bookForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const type=typeSelect.value;
    let newBook;
    if (type==="ebook"){
        const fileSize=document.getElementById("file-size").value;
        newBook=new Ebook(title,author,fileSize);
    }
    else{
        newBook=new Book(title,author);
    }
    console.log(newBook);
    books.push(newBook);
    displayBooks();
    saveBooks();
    bookForm.reset();
        ebookDetails.style.display="none";

});

//feature 5: Display Book Card on the page
function displayBooks() {
    bookList.innerHTML="";
    if (books.length===0) {
        bookList.textContent="No Books Found";
    }
    else{
        books.forEach((book) => {
        const cardElement=book.getHTML();
        bookList.appendChild(cardElement);
        });
    }
//feature 6a: Make the borrow button function.
const borrowButtons=document.querySelectorAll(".btn-borrow");

borrowButtons.forEach((button)=>{
button.addEventListener("click",()=>{
const bookCard=button.closest(".book-card");
const bookId=Number(bookCard.dataset.id);
const matchedBook=books.find(book=>book.id===bookId);
if (matchedBook && matchedBook.available) {
    const bookBorrower=prompt("Enter the name of the borrower:");
    if (bookBorrower){
        borrowBooks(bookId,bookBorrower);
    }
}
});
});

   //Fetaure 6b:Make the return button functional
   const returnButtons=document.querySelectorAll(".btn-return");
   returnButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        const bookCard=button.closest(".book-card");
        const bookId=Number(bookCard.dataset.id);
        returnBooks(bookId);
    });
   });

//Fetute 7: make the remove button functional
const removeButtons=document.querySelectorAll(".btn-remove");
removeButtons.forEach((button) => {
button.addEventListener("click",()=>{
  const isConfirmed=confirm("Are you sure you want to remove this book?");
  if (isConfirmed){
    const bookCard=button.closest(".book-card");
    const bookId=Number(bookCard.dataset.id);
    removeBooks(bookId);
  }
});

});
const downloadButtons = document.querySelectorAll(".btn-download");
 downloadButtons.forEach((button) => {
button.addEventListener("click", () => {
const bookCard = button.closest(".book-card");
const bookId = Number(bookCard.dataset.id);
const matchedBook = books.find(book => book.id === bookId);
    if (matchedBook) {
        alert(`Downloading "${matchedBook.title}" (${matchedBook.fileSize} MB)...`);
         }
});
});

}
function borrowBooks(bookId,bookBorrower){
   const matchedBook=books.find(book=>book.id===bookId);
   if(matchedBook){
    matchedBook.borrow(bookBorrower);
    saveBooks();
    displayBooks();
   }
}

function returnBooks(bookId){
   const matchedBook=books.find(book=>book.id===bookId);
   if(matchedBook){
    matchedBook.markReturn();
    saveBooks();
    displayBooks();
   }
}
function removeBooks(bookId){
    const index=books.findIndex(book => book.id===bookId);
    if(index !== -1){
        books.splice(index,1);
    }
    saveBooks();
    displayBooks();
}

//feature 8a
function saveBooks() {
    localStorage.setItem("booksArray",JSON.stringify(books));
}
//Feature 8b load books from local storage
function loadBooks() {
    const stored=localStorage.getItem("booksArray")
    if (stored !== null) {
        const bookObjects=JSON.parse(stored);
        books = bookObjects.map((obj) =>{
            let rehydratedBook;
            if (obj.type === "ebook") {
                rehydratedBook = new Ebook(obj.title, obj.author, obj.fileSize);
            } else {
                rehydratedBook = new Book(obj.title, obj.author);
            }
    
            rehydratedBook.id = obj.id;
            rehydratedBook.available = obj.available;
            rehydratedBook.borrower = obj.borrower;
            
            return rehydratedBook;
        });
    }
}
loadBooks();
displayBooks();

//completed
