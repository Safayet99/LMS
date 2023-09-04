let books =[];
function addBook(book){
    let table = $("#bookTable tbody");
    table.append(`
    <tr id="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.year}</td>
    <td>${book.qun}</td>
    <td>
    <button class="btn btn-sm btn-warning editBtn" data-id="${book.id}">Edit Book</button>
    </td>
    <td>
    <button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}">Delete</button>
    </td>

    `);
}
function clearForm(){
    $("#bookTitle").val("")
    $("#author").val("")
    $("#genre").val("")
    $("#year").val("")
    $("#qun").val("")
}
function generateId(){
    return Math.floor(Math.random() *  1000000);
}
$(document).on("click","#clearBtn", function(){
    clearForm();
});
$("#bookForm").submit(function(e){
    e.preventDefault();

    let book ={
        id: generateId(),
        title: $("#bookTitle").val(),
        author: $("#author").val(),
        genre: $("#genre").val(),
        year: $("#year").val(),
        qun: $("#qun").val(),
         
        
    };
    books.push(book);
    addBook(book);
clearForm();
});




// Code for editing a book
$(document).on("click", ".editBtn", function () {
    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex !== -1) {
        let book = books[bookIndex];
        $("#editbooktitle").val(book.title);
        $("#editauthor").val(book.author);
        $("#editgenre").val(book.genre);
        $("#edityear").val(book.year);
        $("#editqun").val(book.qun);
        $("#editbookid").val(book.id); // Store the book ID for reference

        $("#editModal").modal("show");
    }
});

// Code for updating the edited book
$("#editForm").submit(function (e) {
    e.preventDefault();

    let bookId = $("#editbookid").val(); // Retrieve the book ID
    let bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex !== -1) {
        books[bookIndex].title = $("#editbooktitle").val();
        books[bookIndex].author = $("#editauthor").val();
        books[bookIndex].genre = $("#editgenre").val();
        books[bookIndex].year = $("#edityear").val();
        books[bookIndex].qun = $("#editqun").val();

        // Update the table row with the edited book details
        let row = $(`#${bookId}`);
        row.find("td:eq(0)").text(books[bookIndex].title);
        row.find("td:eq(1)").text(books[bookIndex].author);
        row.find("td:eq(2)").text(books[bookIndex].genre);
        row.find("td:eq(3)").text(books[bookIndex].year);
        row.find("td:eq(4)").text(books[bookIndex].qun);

        // Close the modal
        $("#editModal").modal("hide");
    }
});



// Code for deleting a book
$(document).on("click", ".deleteBtn", function () {
    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex !== -1) {
        if (confirm(`Are you sure you want to delete ${books[bookIndex].title}?`)) {
            books.splice(bookIndex, 1); // Remove the book from the array
            $(`#${bookId}`).remove(); // Remove the book row from the table
        }
    }
});



