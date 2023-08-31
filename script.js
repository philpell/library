//Create variables from HTML
const showButton = document.getElementById("showDialog");
const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const dialogBox = document.getElementById("dialogBox");
const searchBtn = document.getElementById("searchBtn");
const outputBox = document.querySelector("output");
const readNotRead = dialogBox.querySelector("select");
const confirmBtn = dialogBox.querySelector("#confirmBtn");

//Create empty array to hold books
let library = [];

//Create constructor for the creation of new books
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
    dialogBox.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission 
  dialogBox.close(bookName.value); // Have to send the select box value here.
  
  // Add created book to the library.
  let newBook = new Book(bookName.value, bookAuthor.value, bookPages.value, readNotRead.value)
  library.push(newBook)
  
  // Add created book to the DOM.
  addNewBook()
});

//Add the new book to the library array
function addNewBook(){

    // add the newly created element and its content into the DOM
    const outputDiv = document.getElementById("outputSection");
    
    const theFirstBook = outputDiv.firstChild;

    // Create a new element
    let newElement = document.createElement("div");

    // Insert the new element before the first child
    outputDiv.insertBefore(newElement, theFirstBook);
  
    // and give it some content
    const newBookTitle = document.createTextNode(`Title: ${bookName.value} `);
    const newBookAuthor = document.createTextNode(`Author: ${bookAuthor.value} `);
    const newBookPages = document.createTextNode(`Number of Pages: ${bookPages.value} `);
    const newBookRead = document.createTextNode(`Read or Not: ${readNotRead.value} `);

    // add the text nodes to the newly created div
    newElement.appendChild(newBookTitle);
    newElement.appendChild(newBookAuthor);
    newElement.appendChild(newBookPages);
    newElement.appendChild(newBookRead);
}

//Create search function and add event listener to search button
function searchName() {
  let input = document.getElementById('searchInput').value
  if (input != "") {
    let bookTitle = library.find(Book => Book.name === input);
      if(bookTitle === undefined){
        console.log(`This book is not in the library`)
    } else {
        console.log(bookTitle);
}}} 

searchBtn.addEventListener("click", (e) => {
  searchName();
})

