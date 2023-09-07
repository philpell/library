//Create variables from HTML
const showButton = document.getElementById("showDialog");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const dialogBox = document.getElementById("dialogBox");
const searchBtn = document.getElementById("searchBtn");
const readNotRead = dialogBox.querySelector("select");
const confirmBtn = dialogBox.querySelector("#confirmBtn");
const cancelBtn = dialogBox.querySelector("#cancelBtn");
const searchInput = document.getElementById('searchInput');
const container = document.getElementById('searchContainer');
const resetData = document.getElementById("bookData");
const libraryHeader = document.getElementById('libraryHeader');

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
  console.clear();
  dialogBox.showModal();
  resetData.reset();
});

// Add eventlistener to close the form <dialog> modally
cancelBtn.addEventListener("click", () => {
  dialogBox.close();
  resetData.reset();
  libraryCheck()
});

// Prevent the "confirm" button from submitting the form, close the dialog with the `close()` method.
confirmBtn.addEventListener("click", (event) => {
  if(bookTitle.value != "" || bookAuthor.value != "" || bookPages.value != ""){
  event.preventDefault(); // Prevent form submission 
  dialogBox.close(bookTitle.value);
  
  // Add created book to the library.
  let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readNotRead.value)
  library.push(newBook)

  //Make library header visable  
  libraryHeader.style.color = 'white';

  // Add created book to the DOM.
  addNewBook()  
}
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
  bookBtn.innerHTML = (`${bookTitle.value} by ${bookAuthor.value} is ${bookPages.value} pages long`);
  newElement.appendChild(bookBtn);
  
  //create delete button and add it to the book record
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class","deleteBtn");
  deleteBtn.setAttribute("id",`${bookTitle.value}`); //assigns unique id to btn
  deleteBtn.innerHTML = (`Delete`);
  bookBtn.appendChild(deleteBtn);
  
  //Add eventlistener to the delete button to remove library entry
  deleteBtn.addEventListener("click", function(){ 
    if (window.confirm("Are you sure you want to delete this book?")) {
      newElement.removeChild(bookBtn); //removes the "card" from the screen
      let id = deleteBtn.getAttribute('id')
      let remove = library.findIndex(o => o.title === id);
      library.splice(remove, 1); //removes the "book" from the library
      libraryCheck()
    }  
})

  //create read button and add it to the book record
  const readBtn = document.createElement("button");
  readBtn.setAttribute("class","readBtn");
  readBtn.setAttribute("id",`${bookTitle.value}`); //assigns unique id to btn
  readBtn.innerHTML = (readNotRead.value);
  bookBtn.appendChild(readBtn);

  //set button colour based on status
  if(readBtn.textContent.trim() === 'read'){
    readBtn.style.backgroundColor = '#003400';
} else if(readBtn.textContent.trim() === 'not read'){
    readBtn.style.backgroundColor = '#0e0044';
}
    
  //Add eventlistener to the read button to set colour
  readBtn.addEventListener("click", function(){ 
    let id = readBtn.getAttribute('id')
    let x = library.findIndex(o => o.title === id); //finds relevant object in the library
    if(readBtn.textContent.trim() === 'read'){
      library[x].read ="not read"; //changes object's read status within library
      readBtn.textContent = 'not read';//changes button text
      readBtn.style.backgroundColor = '#0e0044';//changes button colour
  } else if(readBtn.textContent.trim() === 'not read'){
      library[x].read ="read";
      readBtn.textContent = 'read';
      readBtn.style.backgroundColor = '#003400';
}}
)}

// //Search function for title match
function find(searchPhase) {
  if(searchPhase != ""){
  let info = library.filter(book => book.title === searchPhase || book.author === searchPhase)
  if(info.length === 1) {
    return info[0]
  } else if(info.length === 0) {
    if (window.confirm("This book is not in your library, would you like to add it?")) {
      dialogBox.showModal();
      resetData.reset();
    }
    }
  } else {
    alert("Please enter a search phase")
  }
}

// //Add eventlistener to the search button to display search results
searchBtn.addEventListener("click", function(){ 
  let bookInfo = find(searchInput.value); 
  searchInput.value = '';
  alert(`${bookInfo.title} by ${bookInfo.author} is ${bookInfo.pages} long and you have ${bookInfo.read} it.`);
})

function libraryCheck(){
  if(library.length === 0){
  //Hide library header
  libraryHeader.style.color = 'var(--contrastBlue)';
  
  // add the newly created element and its content into the DOM
  const inputDiv = document.getElementById("inputSection");
  const startInstruction = inputDiv.firstChild;

  // Create a new element and insert the new element before the first child
  const newInstruction = document.createElement("div");
  inputDiv.insertBefore(newInstruction, startInstruction);

  //create new book button and add it to the new element
  const instruction = document.createElement("p");
  instruction.innerHTML = (`Please select + button to add a book to your library`);
  newInstruction.appendChild(instruction);
  
  showButton.addEventListener("click", function() {
    newInstruction.removeChild(instruction)
  }
)}
}