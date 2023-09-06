//Create variables from HTML
const showButton = document.getElementById("showDialog");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const dialogBox = document.getElementById("dialogBox");
const searchBtn = document.getElementById("searchBtn");
const outputBox = document.querySelector("output");
const readNotRead = dialogBox.querySelector("select");
const confirmBtn = dialogBox.querySelector("#confirmBtn");
const input = document.getElementById('searchInput');
const container = document.getElementById('searchContainer');

//Create empty array to hold books
let library = [];

//Create constructor for the creation of new books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add eventlistener to open the form <dialog> modally
  showButton.addEventListener("click", () => {
    dialogBox.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission 
  dialogBox.close(bookTitle.value); // Have to send the select box value here.
  
  // Add created book to the library.
  let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readNotRead.value)
  library.push(newBook)

  //Make library header visable  
  const libraryHeader = document.getElementById('libraryHeader');
  libraryHeader.style.color = 'white';

  // Add created book to the DOM.
  addNewBook()
});

//Add the new book to the library array
function addNewBook(){

    // add the newly created element and its content into the DOM
    const outputDiv = document.getElementById("outputSection");
    const nextBook = outputDiv.firstChild;

    // Create a new element and insert the new element before the first child
    const newElement = document.createElement("div");
    outputDiv.insertBefore(newElement, nextBook);

    //create new book button and add it to the new element
    const bookBtn = document.createElement("button");
    bookBtn.innerHTML = (`${bookTitle.value} by ${bookAuthor.value}`);
    newElement.appendChild(bookBtn);

    //create delete button and add it to the book record
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id","deleteBtn");
    deleteBtn.innerHTML = (`Delete`);
    bookBtn.appendChild(deleteBtn);
    
    //Add eventlistener to the delete button to remove library entry
    deleteBtn.addEventListener("click", function(){ 
      newElement.removeChild(bookBtn);
      let obj = library.findIndex(o => o.title === bookTitle.value);
      console.log(bookTitle.value)
      console.log(obj)
      // library.splice(obj, 1);
      console.log(library)
})
    console.log(library)

    //create read button and add it to the book record
    const readBtn = document.createElement("button");
    readBtn.setAttribute("id","readBtn");
    readBtn.innerHTML = (readNotRead.value);
    bookBtn.appendChild(readBtn);

    if(readBtn.textContent.trim() === 'read'){
      readBtn.style.backgroundColor = '#003400';
  } else if(readBtn.textContent.trim() === 'not read'){
      readBtn.style.backgroundColor = '#0e0044';
}
    
    //Add eventlistener to the read button to remove library entry
    readBtn.addEventListener("click", function(){ 
      if(readBtn.textContent.trim() === 'read'){
        readBtn.textContent = 'not read';
        readBtn.style.backgroundColor = '#0e0044';
    } else if(readBtn.textContent.trim() === 'not read'){
        readBtn.textContent = 'read';
        readBtn.style.backgroundColor = '#003400';
}}
)}

//Search function for title match
function find(searchPhase) {
  let info = library.filter(book => book.title === searchPhase || book.author === searchPhase)
  if(info.length === 1) {
    return info[0]
  } else if(info.length === 0) {
    alert(`There are no books containing this search phase`)
  } else {
      alert(`These books are by that author`)
      alert(JSON.stringify(info, null, 4));
    }
  }

//Add eventlistener to the search button to display search results
searchBtn.addEventListener("click", function(){ 
  let bookInfo = find(input.value); 
  alert(`${bookInfo.title} by ${bookInfo.author} is ${bookInfo.pages} long and you have ${bookInfo.read} it.`);
})
