// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create element
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.isbn}</td>
                   <td><i></i><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
  this.showAlert("Book Added Successfully", "success");
};
UI.prototype.showAlert = function(message, className) {
  //   Create Div
  const div = document.createElement("div");
  // Add Classes
  div.className = `alert ${className}`;
  //   Add text
  div.appendChild(document.createTextNode(message));
  //   Get Parent
  const container = document.querySelector(".container");
  //   Get Form
  const form = document.querySelector("#book-form");
  //   Insert alert
  container.insertBefore(div, form);
  //   Timeout
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //Instanciate Book
  const book = new Book(title, author, isbn);
  //Instanciate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill in the Fields ", "error");
  } else {
    ui.addBookToList(book);
    //   Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener For Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  // Show Message

  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
