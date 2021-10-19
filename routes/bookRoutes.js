const router = require("express").Router();
const Book = require("../models/Book.model");      //

router.get('/books', (req, res, next) => {
    //  res.send("aweeeesome")                    //testing if this step works
    Book.find()                                   //make a query to the database with .find({}) to get the list of books --> if empty, we receive all docs
        .then((booksFromDB) => {
            console.log("...........")
            console.log(booksFromDB)             //consol logging list of boks/ how can i get that? //choose a name you put in the func and console.log it
            const data = {
                booksArr: booksFromDB
            }
            res.render("books/books-list", data);     //rendering the book list and pass info booksFromDB which is set in the variable bookList
            //  res.send("cool, I already have the list of books")    
        })
        .catch((error) => {
            console.log("Error getting list of books from DB", error);
            next(error);                        //allows us to handle the error in a better way
        });


});


router.get("/books/create", (req, res, next) => {

    res.render("books/book-create");                           //no second arguement needed because we update 
});

router.post("/books/create", (req, res, next) => {
    console.log(req.body)
    const { title, author, description, rating } = req.body;                        //(object destructuring)req.body because the data is sent through 'post' after that pass this information
    Book.create({ title: title, author: author, description: description, rating: rating })
        .then(() => {
            res.redirect("/books");
        })
        .catch((error) => {
            console.log("Error adding new book to the DB", error);
            next(error);
        });
    });  


    // whenever the user makes a get request to this path we want to display the details
    router.get("/books/:bookId", (req, res, next) => {         // Route params: books/:bookId
        Book.findById(req.params.bookId)                    //make a query to the database to find speficic ID
            .then((booksFromDB) => {

                res.render("books/book-details", booksFromDB);
            })
            .catch((error) => {
                console.log("Error getting details for a single book from DB", error);
                next(error);
            });

    });

    router.get("/books/:bookId/edit", (req, res, next) => {
        Book.findById(req.params.bookId)
            .then((bookFromDB) => {
                res.render("books/book-edit", bookFromDB);
            })
            .catch((error)=>{
                console.log("error, an error occured ", error)
            next(error);
            });

    });

    router.post("/books/:bookId/edit", (req, res, next)=>{

        const { title, author, description, rating } = req.body;  
        const newDetails ={
            title,
            author,
            description,
            rating
        };  

        Book.findByIdAndUpdate(req.params.bookId, newDetails, {new: true} )  //third arguement to read new information and change it in the db
        .then((bookFromDB)=>{
            res.redirect('/books/' + bookFromDB._id);
        })
        .catch((error)=>{
            console.log("error,updating boo details ", error)
        next(error);
        });
    })


    

    module.exports = router;